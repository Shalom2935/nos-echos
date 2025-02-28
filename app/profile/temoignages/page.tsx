'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TestimonialCard from '@/app/components/testimonials/TestimonialCard';
import styles from './page.module.scss';

const userTestimonials = [
  {
    id: 1,
    author: {
      name: 'Anonyme123',
      role: 'Survivant(e)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    stats: {
      likes: 24,
      comments: 5,
      views: 156
    },
    comments: [
      {
        author: 'Dr. Smith',
        role: 'Psychologue',
        content: 'Merci de partager votre histoire. Votre courage est inspirant.',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&auto=format&fit=crop'
      }
    ],
    status: 'published'
  }
];

export default function TestimonialsPage() {
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const toggleComments = (testimonialId: number) => {
    setExpandedComments(prev => 
      prev.includes(testimonialId)
        ? prev.filter(id => id !== testimonialId)
        : [...prev, testimonialId]
    );
  };

  return (
    <div className={styles.testimonials}>
      <div className={styles.testimonials__header}>
        <h1>Mes Témoignages</h1>
        <Button onClick={() => {}}>Nouveau témoignage</Button>
      </div>

      <div className={styles.testimonials__list}>
        {userTestimonials.map((testimonial) => (
          <div key={testimonial.id} className={styles.testimonials__item}>
            <TestimonialCard 
              author={testimonial.author}
              content={testimonial.content}
              stats={testimonial.stats}
              comments={testimonial.comments}
              showComments={expandedComments.includes(testimonial.id)}
              onToggleComments={() => toggleComments(testimonial.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}