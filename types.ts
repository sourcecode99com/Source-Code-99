
// Fix: Import React to provide access to React namespace types
import React from 'react';

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