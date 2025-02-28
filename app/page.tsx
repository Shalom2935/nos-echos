import Hero from './components/home/Hero';
import About from './components/home/About';
import Mission from './components/home/Mission';
import DataSection from './components/home/DataSection';
import FAQ from './components/home/FAQ';
import RootLayout from './components/layout/RootLayout';

export default function Home() {
  return (
    <RootLayout>
      <main>
        <Hero />
        <About />
        <Mission />
        <DataSection />
        <FAQ />
      </main>
    </RootLayout>
  );
}