import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './firebase';
import { Schedule, ArticleInput } from '../types';
import { generateArticle } from './aiService';
import { slugify } from '../lib/utils';

const SCHEDULES_COLLECTION = 'schedules';
const ARTICLES_COLLECTION = 'articles';

export const getSchedules = async () => {
  const q = query(collection(db, SCHEDULES_COLLECTION), orderBy('publishDate', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Schedule));
};

export const createSchedule = async (topic: string, publishDate: Date) => {
  return await addDoc(collection(db, SCHEDULES_COLLECTION), {
    topic,
    publishDate: Timestamp.fromDate(publishDate),
    status: 'scheduled',
    createdAt: serverTimestamp(),
  });
};

export const deleteSchedule = async (id: string) => {
  await deleteDoc(doc(db, SCHEDULES_COLLECTION, id));
};

// Helper to upload image from URL to Firebase Storage
const uploadImageFromUrl = async (url: string, path: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  } catch (err) {
    console.error('Error uploading image:', err);
    return url;
  }
};

export const processSchedule = async (schedule: Schedule) => {
  if (schedule.status === 'published') return;

  try {
    // 1. Generate Article & Image Prompts
    const aiData = await generateArticle(schedule.topic);
    const slug = slugify(aiData.title);

    // 2. Prepare Images
    let finalCoverImage = aiData.coverImageUrl || '';
    let finalContent = aiData.content;

    // Fallback for cover image if empty
    if (!finalCoverImage) {
      // Try to find first image in content
      const parser = new DOMParser();
      const docObj = parser.parseFromString(finalContent, 'text/html');
      const firstImg = docObj.querySelector('img');
      if (firstImg) {
        finalCoverImage = firstImg.getAttribute('src') || '';
      }
      
      // If still empty, use default image
      if (!finalCoverImage) {
        finalCoverImage = 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/dashboard%20admin-booking%20online-sourcecode99com.jpg';
      }
    }

    // 3. Create Article
    const articleData: ArticleInput = {
      title: aiData.title,
      slug,
      content: finalContent,
      excerpt: aiData.excerpt,
      coverImage: finalCoverImage,
      category: 'Technology',
      tags: ['AI', 'Automation', 'Digital'],
      author: auth.currentUser?.displayName || 'System AI',
      status: 'published',
      createdAt: schedule.publishDate, // Use the scheduled date as publish date
      updatedAt: Timestamp.now(),
    };

    const articleRef = await addDoc(collection(db, ARTICLES_COLLECTION), articleData);

    // 4. Update Schedule
    await updateDoc(doc(db, SCHEDULES_COLLECTION, schedule.id), {
      status: 'published',
      articleId: articleRef.id,
      updatedAt: serverTimestamp(),
    });

    return articleRef.id;
  } catch (error) {
    console.error('Error processing schedule:', error);
    throw error;
  }
};

export const runAutoPublish = async () => {
  const now = Timestamp.now();
  const q = query(
    collection(db, SCHEDULES_COLLECTION), 
    where('status', '==', 'scheduled'),
    where('publishDate', '<=', now)
  );
  
  const snapshot = await getDocs(q);
  const results = [];
  
  for (const doc of snapshot.docs) {
    const schedule = { id: doc.id, ...doc.data() } as Schedule;
    try {
      const articleId = await processSchedule(schedule);
      results.push({ id: schedule.id, status: 'success', articleId });
    } catch (err) {
      results.push({ id: schedule.id, status: 'error', error: err });
    }
  }
  
  return results;
};
