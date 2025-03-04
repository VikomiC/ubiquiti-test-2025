import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import type { DeviceDataI } from '@/types/types.ts';

import { generateImagesUrl } from '@/helpers/generateImagesUrl.ts';
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
    <div
      className={styles.root}
      onClick={handleClick}
      onKeyDown={() => {}}
      tabIndex={tabIndex}
    >
      <div className={styles.imageHolder}>
        <div className={styles.lineBadge}>{device.line.name}</div>
        <img
          src={generateImagesUrl({
            id: device.id,
            imagesDefault: device.images.default,
            size: '84',
          })}
          alt={device.product.name}
          className={styles.image}
        />
      </div>
      <div className={styles.detailsBlock}>
        <div className={styles.name}>{device.product.name}</div>
        <div className={styles.shortnames}>{device.shortnames.join(', ')}</div>
      </div>
    </div>
  );
};
