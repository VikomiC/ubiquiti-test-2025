import { Route, Routes } from 'react-router';

import { Header } from '@/components/header/Header';
import { DevicesLayout } from '@/pages/_layouts/devices-layout/DevicesLayout.tsx';
import { ViewDevice } from '@/pages/device-view/ViewDevice';
import { Devices } from '@/pages/devices/Devices';

import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.root}>
      <Header />
      <Routes>
        <Route element={<DevicesLayout />}>
          <Route path="/" element={<Devices />} />
          <Route path="/:deviceId" element={<ViewDevice />} />
        </Route>
      </Routes>
    </div>
  );
};
