import Image from 'next/image';
import styles from '@/app/styles/layout/Footer.module.scss';

export default function BrandInfo() {
  return (
    <div className={styles.footer__brand}>
      <div className={styles.footer__logo}>
        <Image
          src="/images/Logo.svg"
          alt="Nos Echos"
          width={120}
          height={40}
          priority
        />
      </div>
      <p>Université Catholique St Jérôme Douala</p>
      <p>+237 656 555 555</p>
    </div>
  );
}