import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import RootLayout from './components/layout/RootLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Add display swap for better performance
  preload: true,   // Ensure font preloading
});

export const metadata: Metadata = {
  title: 'Nos Echos - Témoignages et Support',
  description: 'Plateforme de témoignages et de support pour les victimes de violence',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}