import { GoogleGenAI, Type } from "@google/genai";
import { storage, db } from "./firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { decrypt } from "./crypto";

// Fallback client for module-level compatibility if needed
const defaultClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Gets a dynamically initialized GoogleGenAI client using keys from Firestore settings.
 * Increments usage counts and decodes keys on-the-fly.
 */
async function getAIClient(type: "article" | "image"): Promise<GoogleGenAI> {
  try {
    const docRef = doc(db, "settings", "apikeys");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const encryptedKey = type === "article" ? data.articleKey : data.imageKey;
      if (encryptedKey) {
        const decryptedKey = decrypt(encryptedKey);
        if (decryptedKey) {
          // Increment the key usage count asynchronously in the background
          updateDoc(docRef, {
            [type === "article" ? "articleUsage" : "imageUsage"]: increment(1)
          }).catch(err => console.error("Error updating key usage stats:", err));

          return new GoogleGenAI({ apiKey: decryptedKey });
        }
      }
    }
  } catch (error) {
    console.warn(`Dynamic ${type} API key fetch failed, using fallback from env:`, error);
  }
  return defaultClient;
}

export interface AIArticleResponse {
  title: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  coverImagePrompt: string;
  contentImagePrompt: string;
  coverImageUrl?: string;
  contentImageUrl?: string;
}

export async function generateArticle(keyword: string): Promise<AIArticleResponse> {
  const client = await getAIClient("article");
  const response = await client.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Buatkan artikel SEO Friendly tentang "${keyword}". 
    
    Gunakan gaya bahasa santai-formal yang 'ngobrol' dengan pembaca Indonesia. 
    Hindari paragraf panjang yang membosankan. 
    Pastikan ada alur masalah-solusi-manfaat. 
    Masukkan brand/Website sourcecode99.com secara halus di tengah dan akhir artikel sebagai solusi.
    Gunakan Human-First SEO Protocol untuk menulis artikel ini.

    Format Output:
    - Gunakan HTML tags (<h2>, <h3>, <p>, <ul>, <li>, <strong>, dll) untuk konten.
    - Jangan gunakan tag <h1> di dalam konten (karena judul sudah ada di field terpisah).
    - Pastikan alur pembaca nyaman dan informatif.
    - Berikan juga prompt bahasa inggris yang sangat deskriptif untuk generate image AI dengan gaya "google nano banana" (modern, clean, high-tech, vibrant) untuk Content Image. Pastikan prompt mencerminkan topik "${keyword}" dan brand "Source Code 99".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING, description: "HTML content for the article body" },
          excerpt: { type: Type.STRING },
          seoTitle: { type: Type.STRING },
          metaDescription: { type: Type.STRING },
          coverImagePrompt: { type: Type.STRING, description: "Descriptive English prompt for AI image generation (Cover)" },
          contentImagePrompt: { type: Type.STRING, description: "Descriptive English prompt for AI image generation (Content)" }
        },
        required: ["title", "content", "excerpt", "seoTitle", "metaDescription", "coverImagePrompt", "contentImagePrompt"]
      }
    }
  });

  const data = JSON.parse(response.text) as AIArticleResponse;
  
  // Image generation disabled as requested to focus on text quality
  data.coverImageUrl = ''; 
  data.contentImageUrl = '';
  
  return data;
}

export async function generateImage(prompt: string): Promise<string> {
  const client = await getAIClient("image");
  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  let base64Data = '';
  const candidates = response.candidates;
  if (candidates && candidates.length > 0) {
    for (const part of candidates[0].content.parts) {
      if (part.inlineData) {
        base64Data = part.inlineData.data;
        break;
      }
    }
  }

  if (!base64Data) {
    throw new Error('No image data returned from AI');
  }

  return `data:image/png;base64,${base64Data}`;
}

export async function rewriteArticle(content: string): Promise<string> {
  const client = await getAIClient("article");
  const response = await client.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Rewrite the following article to be more engaging and SEO-friendly while maintaining the core message. Language: Indonesian.\n\n${content}`,
  });

  return response.text;
}

export async function generateOutline(topic: string): Promise<string> {
  const client = await getAIClient("article");
  const response = await client.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Create a detailed blog post outline for the topic: "${topic}". Language: Indonesian.`,
  });

  return response.text;
}

export async function generateWeeklyTopics(niche: string): Promise<string[]> {
  const client = await getAIClient("article");
  const response = await client.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Generate 7 high-quality, SEO-friendly blog post topics for the niche: "${niche}". 
    Language: Indonesian. 
    Topics should be engaging, trend-based, and relevant for a tech agency blog.
    Return ONLY a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  return JSON.parse(response.text);
}
