import ULogo from '@/assets/logos/u-logo.svg?react';

import styles from './HeaderLogo.module.scss';

export const HeaderLogo = () => (
  <span className={styles.root}>
    <ULogo className={styles.logo} />
  </span>
);
