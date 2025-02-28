'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, MessageSquare, FileText, Settings, LogOut } from 'lucide-react';
import styles from './layout.module.scss';
import Header from '../components/layout/Header';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/profile', label: 'Informations', icon: User },
    { href: '/profile/temoignages', label: 'Mes Témoignages', icon: FileText },
    { href: '/profile/messages', label: 'Messagerie', icon: MessageSquare },
    { href: '/profile/parametres', label: 'Paramètres', icon: Settings },
  ];

  return (
    <>
      <Header />
      <div className={styles.layout}>
        <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebar_open : ''}`}>
          <nav className={styles.nav}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.nav__link} ${
                    pathname === item.href ? styles.nav__link_active : ''
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button className={styles.nav__link}>
              <LogOut size={20} />
              <span>Se déconnecter</span>
            </button>
          </nav>
        </aside>

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
}