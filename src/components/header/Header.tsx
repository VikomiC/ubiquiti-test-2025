import { HeaderLogo } from '@/components/header-logo/HeaderLogo';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <HeaderLogo />
        <div className={styles.title}>Devices</div>
      </div>
      <div className={styles.userBlock}>Victor Ovchinnikov</div>
    </div>
  );
};
