import { Routes, Route } from 'react-router';

import { Header } from '@/components/header/Header';
import { Devices } from '@/pages/devices/Devices';
import { ViewDevice } from '@/pages/device-view/ViewDevice';

import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.root}>
      <Header />
      <Routes>
        <Route path="/" element={<Devices />} />
        <Route path="/:deviceId" element={<ViewDevice />} />
      </Routes>
    </div>
  );
};
