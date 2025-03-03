import ULogo from '@/assets/logos/u-logo.svg?react';

import styles from './HeaderLogo.module.scss';

export const HeaderLogo = () => (
  <button className={styles.root}>
    <ULogo className={styles.logo} />
  </button>
);
