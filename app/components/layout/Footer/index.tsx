import BrandInfo from './BrandInfo';
import NavigationLinks from './NavigationLinks';
import SocialLinks from './SocialLinks';
import styles from '@/app/styles/layout/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <BrandInfo />
        <NavigationLinks />
        <SocialLinks />
      </div>
    </footer>
  );
}