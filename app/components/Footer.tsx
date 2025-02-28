import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__brand}>
          <h3>NOS ECHOS</h3>
          <p>Université Catholique St Jérôme Douala</p>
          <p>+237 656 555 555</p>
        </div>

        <div className={styles.footer__links}>
          <div>
            <h4>Pages</h4>
            <Link href="/">Accueil</Link>
            <Link href="/temoignages">Témoignages</Link>
            <Link href="/aide">Trouver de l'aide</Link>
          </div>

          <div>
            <h4>Liens Utiles</h4>
            <Link href="/about">À propos de Nos Échos</Link>
            <Link href="/testimonial">Donner son témoignage</Link>
            <Link href="/specialist">Devenir Un spécialiste</Link>
            <Link href="/donate">Donner aux autres</Link>
            <Link href="/terms">Conditions générales d'utilisation</Link>
          </div>
        </div>

        <div className={styles.footer__social}>
          <h4>Suivez-nous sur les réseaux</h4>
          <div className={styles.footer__socialIcons}>
            <Link href="#"><Facebook size={24} /></Link>
            <Link href="#"><Twitter size={24} /></Link>
            <Link href="#"><Instagram size={24} /></Link>
            <Link href="#"><Linkedin size={24} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}