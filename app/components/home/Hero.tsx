import Image from 'next/image';
import styles from '@/app/styles/Home.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__background}>
        <Image
          src="/images/hero.png"
          alt="Hero background"
          width={1920}
          height={1080}
          sizes="100vw"
          quality={90}
          priority
          className={styles.hero__image}
        />
        <Image
          src="/images/hero-mobile.png"
          alt="Hero background mobile"
          width={768}
          height={1024}
          sizes="100vw"
          quality={90}
          priority
          className={styles.hero__imageMobile}
        />
      </div>
      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>
          L'<span>EXPRESSION</span>
        </h1>
        <h2 className={styles.hero__subtitle}>PREMIER PAS VERS LA DELIVRANCE</h2>
      </div>
    </section>
  );
}