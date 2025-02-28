'use client';

import Header from './Header';
import Footer from './Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}