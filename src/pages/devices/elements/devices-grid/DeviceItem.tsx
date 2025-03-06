import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { ImageWithFallback } from '@/components/image-with-fallback/ImageWithFallback';
import type { DeviceDataI } from '@/types/types';

import styles from './DeviceItem.module.scss';

interface DeviceItemPropsI {
  device: DeviceDataI;
  tabIndex: number;
}

export const DeviceItem = ({ device, tabIndex }: DeviceItemPropsI) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/${device.id}`);
  }, [navigate, device]);

  return (
    <div className={styles.root} onClick={handleClick} onKeyDown={() => {}} tabIndex={tabIndex}>
      <div className={styles.imageHolder}>
        <div className={styles.lineBadge}>{device.line.name}</div>
        <ImageWithFallback
          urlProps={{
            id: device.id,
            imagesDefault: device.images.default,
            size: '84',
          }}
          className={styles.image}
          title={device.product.name}
          width={84}
          height={84}
        />
      </div>
      <div className={styles.detailsBlock}>
        <div className={styles.name}>{device.product.name}</div>
        <div className={styles.shortnames}>{device.shortnames.join(', ')}</div>
      </div>
    </div>
  );
};
