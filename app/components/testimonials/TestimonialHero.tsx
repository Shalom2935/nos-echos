'use client';

import { Button } from '@/components/ui/button';
import styles from '@/app/styles/testimonials/TestimonialHero.module.scss';

interface TestimonialHeroProps {
  onShare: () => void;
}

export default function TestimonialHero({ onShare }: TestimonialHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <h1>Témoignages</h1>
        <p>
          Chaque témoignage est une voix courageuse qui refuse 
          de se taire face aux violences basées sur le genre. Ces 
          histoires reflètent le courage, la résilience et l'espoir 
          que des victimes et témoins trouvent malgré les 
          épreuves et les traumatismes vécus.
        </p>
        <Button 
          className={styles.hero__button}
          onClick={onShare}
        >
          Donner son témoignage
        </Button>
      </div>
      <div className={styles.hero__image}>
        <img 
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop"
          alt="Person sharing their story"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
}