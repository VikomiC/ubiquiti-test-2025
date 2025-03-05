import { Outlet } from 'react-router';

import { useDevicesFetch } from '@/pages/devices/hooks/useDevicesFetch.ts';
import { useFilteredDevices } from '@/pages/devices/hooks/useFilteredDevices.ts';

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
