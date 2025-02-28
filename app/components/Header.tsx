'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import styles from '../styles/Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/" className={styles.header__logo}>
          NOS ECHOS
        </Link>

        <button 
          className={styles.header__menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </button>

        <nav className={`${styles.header__nav} ${isMenuOpen ? styles.header__nav_open : ''}`}>
          <Link href="/">Accueil</Link>
          <Link href="/temoignages">Témoignages</Link>
          <Link href="/aide">Trouver de l'aide</Link>
          <Link href="/login">S'inscrire/Se Connecter</Link>
        </nav>
      </div>
    </header>
  );
}