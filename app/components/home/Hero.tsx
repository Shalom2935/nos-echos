import styles from '@/app/styles/Home.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>
          L'<span>EXPRESSION</span>
        </h1>
        <h2 className={styles.hero__subtitle}>PREMIER PAS VERS LA DELIVRANCE</h2>
      </div>
    </section>
  );
}