import type { DeviceDataI } from '@/types/types.ts';

import { DeviceItem } from '@/pages/devices/elements/devices-grid/DeviceItem.tsx';
import styles from './DevicesGrid.module.scss';

interface DevicesGridPropsI {
  devices: DeviceDataI[];
}

export const DevicesGrid = ({ devices }: DevicesGridPropsI) => {
  return (
    <div className={styles.root}>
      {devices.map((device, index) => (
        <DeviceItem device={device} key={device.id} tabIndex={index} />
      ))}
    </div>
  );
};
