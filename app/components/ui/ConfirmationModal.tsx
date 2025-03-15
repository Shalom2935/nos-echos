'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  autoCloseTime?: number; // Time in ms before auto-closing
}

export default function ConfirmationModal({
  message,
  isOpen,
  onClose,
  autoCloseTime = 0
}: ConfirmationModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Auto-close after specified time if provided
      if (autoCloseTime > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseTime);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, autoCloseTime]);

  const handleClose = () => {
    setIsVisible(false);
    // Small delay to allow animation to complete
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}>
      <div className={`${styles.modal} ${isVisible ? styles.visible : ''}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X size={20} />
        </button>
        <div className={styles.content}>
          <p>{message}</p>
          <Button onClick={handleClose} className={styles.button}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
