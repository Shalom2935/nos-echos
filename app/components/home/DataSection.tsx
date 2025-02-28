import Image from 'next/image';
import styles from '@/app/styles/Home.module.scss';

export default function DataSection() {
  return (
    <section className={styles.data}>
      <Image
        src="images/earth.jpeg"
        alt="Global data visualization"
        width={300}
        height={200}
        className={styles.mission__image}
      />
      <div className={styles.data__content}>
        <h2 className={styles.data__title}>Des Données Pour la Dignité</h2>
        <p className={styles.data__text}>
          Nous collectons des données et des témoignages pour étayer nos efforts de plaidoyer et influencer les politiques en faveur des victimes. En recueillant des données sur l'impact de la violence basée sur le genre, nous visons à améliorer les services de soutien et à sensibiliser davantage à cette question.
        </p>
      </div>
    </section>
  );
}