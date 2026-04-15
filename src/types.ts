import { Timestamp } from 'firebase/firestore';

export type ArticleStatus = 'draft' | 'published';
export type ScheduleStatus = 'scheduled' | 'generated' | 'published';

export interface Schedule {
  id: string;
  topic: string;
  publishDate: Timestamp;
  status: ScheduleStatus;
  articleId?: string;
  createdAt: Timestamp;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  status: ArticleStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ArticleInput extends Omit<Article, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
