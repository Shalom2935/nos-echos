import styles from '@/app/styles/layout/Footer.module.scss';

export default function BrandInfo() {
  return (
    <div className={styles.footer__brand}>
      <h3>NOS ECHOS</h3>
      <p>Université Catholique St Jérôme Douala</p>
      <p>+237 656 555 555</p>
    </div>
  );
}