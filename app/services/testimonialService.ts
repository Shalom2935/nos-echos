'use client';

import { Testimony } from '../types/testimony';

const defaultUser = {
  name: 'Anonyme',
  role: 'Témoin',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop'
};

interface TestimonialData {
  id: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  stats: {
    likes: number;
    comments: number;
    views: number;
  };
  comments: Array<{
    author: string;
    role: string;
    content: string;
    avatar: string;
  }>;
}

class TestimonialService {
  private static instance: TestimonialService;
  private testimonials: TestimonialData[];

  private constructor() {
    this.testimonials = [];
    // Check if window is defined (client-side) before accessing localStorage
    if (typeof window !== 'undefined') {
      const storedTestimonials = localStorage.getItem('testimonials');
      this.testimonials = storedTestimonials ? JSON.parse(storedTestimonials) : [];
    }
  }

  public static getInstance(): TestimonialService {
    if (!TestimonialService.instance) {
      TestimonialService.instance = new TestimonialService();
    }
    return TestimonialService.instance;
  }

  private saveToLocalStorage(): void {
    // Check if window is defined (client-side) before accessing localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('testimonials', JSON.stringify(this.testimonials));
    }
  }

  public addTestimonial(content: string): TestimonialData {
    const newTestimonial: TestimonialData = {
      id: Date.now(),
      author: defaultUser,
      content,
      stats: {
        likes: 0,
        comments: 0,
        views: 0
      },
      comments: []
    };

    this.testimonials.unshift(newTestimonial);
    this.saveToLocalStorage();
    return newTestimonial;
  }

  public deleteTestimonial(id: number): void {
    this.testimonials = this.testimonials.filter(t => t.id !== id);
    this.saveToLocalStorage();
  }

  public getAllTestimonials(): TestimonialData[] {
    return this.testimonials;
  }
}

export default TestimonialService;