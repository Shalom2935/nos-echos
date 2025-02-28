'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import styles from './page.module.scss';
import RootLayout from '../components/layout/RootLayout';

// Mock user for testing
const mockUser = {
  email: 'test@example.com',
  password: 'password123',
  profile: {
    pseudo: 'Anonyme123',
    gender: 'homme',
    birthdate: '1990-01-01',
    status: 'survivant',
    phone: '+237 656 555 555'
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    if (
      (formData.identifier === mockUser.email || formData.identifier === mockUser.profile.pseudo) &&
      formData.password === mockUser.password
    ) {
      // Simulate storing user data in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      router.push('/profile');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <RootLayout>
      <main className={styles.page}>
        <h1>Bienvenu dans la grande communauté Nos Echos</h1>

        <div className={styles.auth}>
          <h2>Se Connecter</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form__field}>
              <label>Email ou Pseudo</label>
              <Input
                type="text"
                value={formData.identifier}
                onChange={(e) => setFormData(prev => ({ ...prev, identifier: e.target.value }))}
                placeholder="Entrez votre email ou pseudo"
              />
            </div>

            <div className={styles.form__field}>
              <label>Mot de passe</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Entrez votre mot de passe"
              />
            </div>

            {error && (
              <p className={styles.form__error}>{error}</p>
            )}

            <Button type="submit" className={styles.form__submit}>
              Se Connecter
            </Button>

            <p className={styles.form__switch}>
              Pas de compte ? <Link href="/register">s'inscrire</Link>
            </p>
          </form>
        </div>
      </main>
    </RootLayout>
  );
}