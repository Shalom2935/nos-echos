'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/testimonials/TestimonialHero.module.scss';

interface TestimonialHeroProps {
  onShare: () => void;
}

export default function TestimonialHero({ onShare }: TestimonialHeroProps) {
  const router = useRouter();
  
  const handleShareClick = () => {
    router.push('/aide');
  };
  
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
          onClick={handleShareClick}
        >
          Donner son témoignage
        </Button>
      </div>
      <div className={styles.hero__image}>
        <Image 
          src="/images/testimonial.png"
          alt="Person sharing their story"
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          priority
          className={styles.hero__imageContent}
        />
      </div>
    </section>
  );
}