'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Upload } from 'lucide-react';
import styles from './page.module.scss';
import RootLayout from '../components/layout/RootLayout';

export default function RegisterPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    pseudo: '',
    gender: '',
    birthdate: '',
    status: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    specialist: false,
    acceptTerms: false
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          // Créer un canvas pour redimensionner l'image
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 800; // Taille maximale en pixels
          let width = img.width;
          let height = img.height;

          // Redimensionner tout en gardant les proportions
          if (width > height && width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Convertir en base64 avec une qualité réduite
          const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
          setFormData(prev => ({ ...prev, avatar: resizedImage }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;

      // Attendre que la vidéo soit chargée
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      const canvas = document.createElement('canvas');
      const aspectRatio = video.videoWidth / video.videoHeight;
      const width = Math.min(800, video.videoWidth);
      const height = width / aspectRatio;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setFormData(prev => ({ ...prev, avatar: dataUrl }));

      // Arrêter la caméra
      stream.getTracks().forEach(track => track.stop());
      video.remove();
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Impossible d\'accéder à la caméra. Veuillez vérifier vos permissions.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.email || !formData.pseudo || !formData.password) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (!formData.acceptTerms) {
      alert('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    const userData = {
      email: formData.email,
      password: formData.password,
      profile: {
        pseudo: formData.pseudo,
        gender: formData.gender,
        birthdate: formData.birthdate,
        status: formData.status,
        avatar: formData.avatar
      }
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/profile');
  };

  return (
    <RootLayout>
      <main className={styles.page}>
        <h1>Bienvenu dans la grande communauté Nos Echos</h1>

        <div className={styles.auth}>
          <h2>Inscription</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form__avatar}>
              <Avatar className={styles.form__avatarPreview}>
                {formData.avatar ? (
                  <AvatarImage src={formData.avatar} alt="Preview" />
                ) : (
                  <AvatarFallback>
                    {formData.pseudo ? formData.pseudo[0].toUpperCase() : 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <label>Photo de profil</label>
                <div className={styles.form__avatarActions}>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choisir une photo
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleCameraCapture}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Prendre une photo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.form__grid}>
              <div className={styles.form__field}>
                <label>Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="xyz@exemple.com"
                  required
                />
              </div>

              <div className={styles.form__field}>
                <label>Pseudo (Le pseudo est un alias pour conserver votre anonymat)</label>
                <Input
                  type="text"
                  value={formData.pseudo}
                  onChange={(e) => setFormData(prev => ({ ...prev, pseudo: e.target.value }))}
                  placeholder="Anonyme123"
                  required
                />
              </div>

              <div className={styles.form__field}>
                <label>Genre</label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homme">Homme</SelectItem>
                    <SelectItem value="femme">Femme</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className={styles.form__field}>
                <label>Naissance</label>
                <Input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthdate: e.target.value }))}
                />
              </div>

              <div className={styles.form__field}>
                <label>Statut</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="victime">Victime</SelectItem>
                    <SelectItem value="temoin">Témoin</SelectItem>
                    <SelectItem value="survivant">Survivant(e)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className={styles.form__field}>
              <label>Mot de passe</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <div className={styles.form__field}>
              <label>Confirmer le mot de passe</label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>

            <div className={styles.form__checkboxes}>
              <div className={styles.form__checkbox}>
                <Checkbox
                  id="specialist"
                  checked={formData.specialist}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, specialist: checked as boolean }))
                  }
                />
                <label htmlFor="specialist">
                  Je souhaite <Link href="/devenir-specialiste">devenir un spécialiste</Link>
                </label>
              </div>

              <div className={styles.form__checkbox}>
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                  }
                />
                <label htmlFor="terms">
                  J'accepte <Link href="/reglement">le règlement</Link> et les{' '}
                  <Link href="/conditions">conditions générales d'utilisation</Link>
                </label>
              </div>
            </div>

            <Button type="submit" className={styles.form__submit}>
              S'inscrire
            </Button>

            <p className={styles.form__switch}>
              Déjà un compte ? <Link href="/login">se connecter</Link>
            </p>
          </form>
        </div>
      </main>
    </RootLayout>
  );
}