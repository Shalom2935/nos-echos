'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import styles from '@/app/styles/layout/Header.module.scss';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/temoignages', label: 'Témoignages' },
    { href: '/aide', label: 'Trouver de l\'aide' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/" className={styles.header__logo}>
          <Image
            src="/images/logo.svg"
            alt="Nos Echos"
            width={120}
            height={40}
            priority
          />
        </Link>

        <button 
          className={styles.header__menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu />
        </button>

        <nav className={`${styles.header__nav} ${isMenuOpen ? styles.header__nav_open : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={pathname === link.href ? styles.header__nav_active : ''}
            >
              {link.label}
            </Link>
          ))}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className={styles.header__profile}>
                <Avatar>
                  <AvatarImage src={user.profile.avatar} alt={user.profile.pseudo} />
                  <AvatarFallback>{user.profile.pseudo[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Voir le profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">S'inscrire/Se Connecter</Link>
          )}
        </nav>
      </div>
    </header>
  );
}