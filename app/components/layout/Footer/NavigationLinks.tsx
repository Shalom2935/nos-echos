import Link from 'next/link';
import styles from '@/app/styles/layout/Footer.module.scss';

const mainLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/temoignages', label: 'Témoignages' },
  { href: '/aide', label: 'Trouver de l\'aide' }
];

const utilityLinks = [
  { href: '/about', label: 'À propos de Nos Échos' },
  { href: '/testimonial', label: 'Donner son témoignage' },
  { href: '/specialist', label: 'Devenir Un spécialiste' },
  { href: '/donate', label: 'Donner aux autres' },
  { href: '/terms', label: 'Conditions générales d\'utilisation' }
];

export default function NavigationLinks() {
  return (
    <div className={styles.footer__links}>
      <div>
        <h4>Pages</h4>
        {mainLinks.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </div>

      <div>
        <h4>Liens Utiles</h4>
        {utilityLinks.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </div>
    </div>
  );
}