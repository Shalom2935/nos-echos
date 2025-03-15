'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmationCard from '../components/testimonials/ConfirmationCard';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import styles from './page.module.scss';
import RootLayout from '../components/layout/RootLayout';
import TestimonialService from '../services/testimonialService';

export default function AidePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: '',
    gender: '',
    age: '',
    region: '',
    city: '',
    district: '',
    testimony: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.testimony.trim()) {
      alert('Veuillez partager votre témoignage avant de soumettre.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const testimonialService = TestimonialService.getInstance();
      testimonialService.addTestimonial(formData.testimony);
      
      // Reset form and show confirmation
      setFormData(prev => ({ ...prev, testimony: '' }));
      setShowConfirmation(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Une erreur s\'est produite lors de la publication de votre témoignage. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };
  
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <RootLayout>
      <main className={styles.page}>
        <ConfirmationCard 
          show={showConfirmation} 
          onClose={handleCloseConfirmation} 
        />
        <section className={styles.hero}>
          <h1>Partagez votre histoire, trouvez de l'aide</h1>
          <p>
            Votre témoignage est analysé avec soin par nos spécialistes. Cela nous permet de comprendre votre situation et de 
            vous proposer l'aide la plus adaptée.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop"
            alt="Person speaking with megaphone"
            className={styles.hero__image}
          />
        </section>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form__notice}>
            Tous les témoignages sont anonymes et protégés
          </div>

          <div className={styles.form__field}>
            <label>1. Etes-vous une victime, un(e) survivant(e) ou un témoin ?</label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre situation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="victim">Victime</SelectItem>
                <SelectItem value="survivor">Survivant(e)</SelectItem>
                <SelectItem value="witness">Témoin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={styles.form__field}>
            <label>2. Quel est votre sexe ?</label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre sexe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Homme</SelectItem>
                <SelectItem value="female">Femme</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={styles.form__field}>
            <label>3. Quel âge avez-vous ?</label>
            <Select
              value={formData.age}
              onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre tranche d'âge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under18">&lt; 18 ans</SelectItem>
                <SelectItem value="18-24">18-24 ans</SelectItem>
                <SelectItem value="25-34">25-34 ans</SelectItem>
                <SelectItem value="35-44">35-44 ans</SelectItem>
                <SelectItem value="45plus">45 ans et plus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={styles.form__field}>
            <label>4. Dans quelle Région/Ville/Quartier l'histoire s'est-elle déroulée ?</label>
            <div className={styles.form__location}>
              <Select
                value={formData.region}
                onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Région" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="douala">Douala</SelectItem>
                  <SelectItem value="yaounde">Yaoundé</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={formData.city}
                onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="douala">Douala</SelectItem>
                  <SelectItem value="yaounde">Yaoundé</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={formData.district}
                onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Quartier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="akwa">Akwa</SelectItem>
                  <SelectItem value="bonanjo">Bonanjo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={styles.form__field}>
            <label>5. Exprimez-vous !</label>
            <Textarea
              value={formData.testimony}
              onChange={(e) => setFormData(prev => ({ ...prev, testimony: e.target.value }))}
              placeholder="Partagez votre histoire..."
              className={styles.form__textarea}
              required
            />
          </div>

          <div className={styles.form__notice}>
            Seuls votre témoignage et la réponse à la question 1 seront publiés. Toute autre information sera gardée confidentielle
          </div>

          <Button type="submit" className={styles.form__submit} disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Témoigner'}
          </Button>
        </form>
      </main>
    </RootLayout>
  );
}