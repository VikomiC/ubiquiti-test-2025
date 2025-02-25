import styles from './Header.module.scss';
import { HeaderLogo } from '@/components/header-logo/HeaderLogo.tsx';

export const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <HeaderLogo />
        <div className={styles.title}>Devices</div>
      </div>
      <div className={styles.userBlock}>Author/Developer Name</div>
    </div>
  );
};
