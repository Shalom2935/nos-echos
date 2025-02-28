import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from '@/app/styles/layout/Footer.module.scss';

export default function SocialLinks() {
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' }
  ];

  return (
    <div className={styles.footer__social}>
      <h4>Suivez-nous sur les réseaux</h4>
      <div className={styles.footer__socialIcons}>
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link key={index} href={link.href}>
              <Icon size={24} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}