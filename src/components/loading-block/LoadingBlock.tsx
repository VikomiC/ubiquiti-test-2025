import LoadingIcon from '@/assets/icons/spinner.svg?react';

import styles from './LoadingBlock.module.scss';

export const LoadingBlock = () => (
  <div className={styles.root}>
    <LoadingIcon className={styles.icon} />
  </div>
);
