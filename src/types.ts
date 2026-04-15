import { Timestamp } from 'firebase/firestore';
import React from 'react';

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

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  target: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}
