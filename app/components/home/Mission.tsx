import Image from 'next/image';
import styles from '@/app/styles/Home.module.scss';

export default function Mission() {
  return (
    <section className={styles.mission}>
      <div className={styles.mission__content}>
        <h2 className={styles.mission__title}>Notre Mission</h2>
        <p className={styles.mission__text}>
          nec diam urna, maximus Quisque convallis, nec ipsum ipsum eu ex, placerat. leo, sed at tincidunt ultrices nec gravida est. malesuada quis ex, venenatis Nunc amet, turpis vitae id quis odio Nunc laceret Cras elit. ex Ut ultrices porta odio volutpat non maximus vehicula, risus vehicula, sit quis elit, sed non commodo elit, nibh libero, at hendrerit ex ex, id Donec tortor, ex amet, leo, nibh fringilla lacus, Lorem cursus massa
        </p>
      </div>
      <div className={styles.mission__imageWrapper}>
        <Image
          src="/images/butterfly.png"
          alt="Butterfly representing freedom"
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          className={styles.mission__image}
        />
        <Image
          src="/images/butterfly-mobile.png"
          alt="Butterfly representing freedom"
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, 0"
          quality={90}
          className={styles.mission__imageMobile}
        />
      </div>
    </section>
  );
}