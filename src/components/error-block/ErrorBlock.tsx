import { Button } from '@/components/button/Button';

import styles from './ErrorBlock.module.scss';

interface ErrorBlockProps {
  error: Error;
  reloadCallback?: () => void;
}

export const ErrorBlock = ({ error, reloadCallback }: ErrorBlockProps) => (
  <div className={styles.root}>
    <div className={styles.errorMessage}>{error.message}</div>
    {reloadCallback && <Button onClick={reloadCallback}>Reload</Button>}
  </div>
);
