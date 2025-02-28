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
      <Image
        src="/butterfly.jpg"
        alt="Butterfly representing freedom"
        width={600}
        height={400}
        className={styles.mission__image}
      />
    </section>
  );
}