'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TestimonialHero from '@/app/components/testimonials/TestimonialHero';
import TestimonialCard from '@/app/components/testimonials/TestimonialCard';
import { Button } from '@/components/ui/button';
import styles from '@/app/styles/testimonials/Page.module.scss';
import RootLayout from '../components/layout/RootLayout';

const testimonials = [
  {
    id: 1,
    author: {
      name: 'Anonyme Pseudo123',
      role: 'Victime',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop'
    },
    content: 'ex Nunc sit ac In Sed Lorem nisi nulla, vitae in vitae Nunc dignissim, turpis volutpat tincidunt ex ex urna dui, vehicula, in dolor non viverra faucibus Ut at lorem non Nunc adipiscing elit lacus eu tincidunt efficitur, eget vehicula...',
    stats: {
      likes: 24,
      comments: 5,
      views: 156
    },
    comments: [
      {
        author: 'Moon Explorer',
        role: 'Psychologue clinicien',
        content: 'Merci de partager votre histoire. Votre courage est inspirant.',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 2,
    author: {
      name: 'Mercure',
      role: 'Témoin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop'
    },
    content: 'Nunc sit amet consectetur adipiscing elit. Sed vitae lorem non elit lacinia ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    stats: {
      likes: 15,
      comments: 3,
      views: 89
    },
    comments: []
  }
];

export default function TemoignagesPage() {
  const router = useRouter();
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const toggleComments = (testimonialId: number) => {
    setExpandedComments(prev => 
      prev.includes(testimonialId)
        ? prev.filter(id => id !== testimonialId)
        : [...prev, testimonialId]
    );
  };

  const handleShare = () => {
    router.push('/aide');
  };

  return (
    <RootLayout>
      <main className={styles.page}>
        <TestimonialHero onShare={handleShare} />
        <section className={styles.testimonials}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonial__container}>
              <TestimonialCard 
                author={testimonial.author}
                content={testimonial.content}
                stats={testimonial.stats}
                onToggleComments={() => toggleComments(testimonial.id)}
                showComments={expandedComments.includes(testimonial.id)}
                comments={testimonial.comments}
              />
            </div>
          ))}
          <div className={styles.testimonials__loadMore}>
            <Button variant="outline" onClick={() => {}}>
              Voir plus de témoignages
            </Button>
          </div>
        </section>
      </main>
    </RootLayout>
  );
}