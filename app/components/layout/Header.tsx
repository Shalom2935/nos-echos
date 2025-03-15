'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import styles from '@/app/styles/Header.module.scss';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen && 
        navRef.current && 
        buttonRef.current && 
        !navRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/temoignages', label: 'Témoignages' },
    { href: '/aide', label: 'Trouver de l\'aide' },
  ];

  return (
    <>
      <div 
        ref={backdropRef}
        className={`${styles.backdrop} ${isMenuOpen ? styles.backdrop_visible : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
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
            ref={buttonRef}
            className={`${styles.header__menuButton} ${isMenuOpen ? styles.header__menuButton_open : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav 
            ref={navRef}
            className={`${styles.header__nav} ${isMenuOpen ? styles.header__nav_open : ''}`}
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={pathname === link.href ? styles.header__nav_active : ''}
                onClick={() => setIsMenuOpen(false)}
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
    </>
  );
}