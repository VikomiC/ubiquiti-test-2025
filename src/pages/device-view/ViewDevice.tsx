import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import LeftIcon from '@/assets/icons/left.svg?react';
import RightIcon from '@/assets/icons/right.svg?react';
import { Button } from '@/components/button/Button.tsx';

import styles from './ViewDevice.module.scss';

export const ViewDevice = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <Button onClick={handleBack}>
          <LeftIcon /> Back
        </Button>
        <div className={styles.navButtons}>
          <Button>
            <LeftIcon />
          </Button>
          <Button>
            <RightIcon />
          </Button>
        </div>
      </div>
      View Device
    </div>
  );
};
