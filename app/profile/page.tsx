'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Upload } from 'lucide-react';
import styles from './page.module.scss';

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    pseudo: '',
    gender: '',
    birthdate: '',
    status: '',
    phone: '',
    avatar: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userData);
    setFormData({
      email: user.email,
      avatar: user.profile.avatar || '',
      ...user.profile
    });
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      
      video.srcObject = stream;
      await video.play();

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);

      const dataUrl = canvas.toDataURL('image/jpeg');
      setFormData(prev => ({ ...prev, avatar: dataUrl }));

      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = {
      ...userData,
      email: formData.email,
      profile: {
        pseudo: formData.pseudo,
        gender: formData.gender,
        birthdate: formData.birthdate,
        status: formData.status,
        phone: formData.phone,
        avatar: formData.avatar
      }
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        <h1>Informations Personnelles</h1>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Annuler' : 'Modifier'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__avatar}>
          <Avatar className={styles.form__avatarPreview}>
            <AvatarImage src={formData.avatar} alt={formData.pseudo} />
            <AvatarFallback>{formData.pseudo ? formData.pseudo[0].toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
          {isEditing && (
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
          )}
        </div>

        <div className={styles.form__grid}>
          <div className={styles.form__field}>
            <label>Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.form__field}>
            <label>Pseudo</label>
            <Input
              type="text"
              value={formData.pseudo}
              onChange={(e) => setFormData(prev => ({ ...prev, pseudo: e.target.value }))}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.form__field}>
            <label>Genre</label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homme">Homme</SelectItem>
                <SelectItem value="femme">Femme</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={styles.form__field}>
            <label>Date de naissance</label>
            <Input
              type="date"
              value={formData.birthdate}
              onChange={(e) => setFormData(prev => ({ ...prev, birthdate: e.target.value }))}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.form__field}>
            <label>Statut</label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="victime">Victime</SelectItem>
                <SelectItem value="temoin">Témoin</SelectItem>
                <SelectItem value="survivant">Survivant(e)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={styles.form__field}>
            <label>Téléphone</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <Button type="submit" className={styles.form__submit}>
            Enregistrer les modifications
          </Button>
        )}
      </form>
    </div>
  );
}