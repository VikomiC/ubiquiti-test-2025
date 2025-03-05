import { Outlet } from 'react-router';

import { useDevicesFetch } from '@/pages/devices/hooks/useDevicesFetch';
import { useFilteredDevices } from '@/pages/devices/hooks/useFilteredDevices';

import styles from './DevicesLayout.module.scss';

export const DevicesLayout = () => {
  useDevicesFetch();
  useFilteredDevices();

  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
};
