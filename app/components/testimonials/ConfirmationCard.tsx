'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import styles from '@/app/styles/testimonials/ConfirmationCard.module.scss';

interface ConfirmationCardProps {
  show: boolean;
  onClose: () => void;
}

export default function ConfirmationCard({ show, onClose }: ConfirmationCardProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleViewClick = () => {
    router.push('/temoignages');
    onClose();
  };

  if (!show && !isVisible) return null;

  return (
    <div className={`${styles.overlay} ${show ? styles.overlay_visible : ''}`}>
      <div className={`${styles.card} ${show ? styles.card_visible : ''}`}>
        <button className={styles.card__close} onClick={onClose}>
          <X size={20} />
        </button>
        <div className={styles.card__content}>
          <h3>Témoignage publié</h3>
          <p>Votre témoignage a été publié avec succès!</p>
          <div className={styles.card__actions}>
            <Button variant="outline" onClick={onClose}>OK</Button>
            <Button onClick={handleViewClick}>Voir les témoignages</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
