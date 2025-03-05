import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import {
  devicesAtom,
  filteredDevicesAtom,
  filteredLinesAtom,
  searchValueAtom,
} from '@/state/devices.state.ts';

export function useFilteredDevices() {
  const devices = useAtomValue(devicesAtom);
  const filteredLines = useAtomValue(filteredLinesAtom);
  const searchValue = useAtomValue(searchValueAtom);
  const setFilteredDevices = useSetAtom(filteredDevicesAtom);

  useEffect(() => {
    if (devices === null) {
      setFilteredDevices([]);
      return;
    }

    if (filteredLines.length === 0 && searchValue === '') {
      setFilteredDevices(devices);
      return;
    }

    let devicesCopy = devices.slice();
    if (filteredLines.length > 0) {
      devicesCopy = devicesCopy.filter((device) =>
        filteredLines.includes(device.line.name),
      );
    }
    if (searchValue !== '') {
      const searchValueLC = searchValue.toLowerCase();
      devicesCopy = devicesCopy.filter((device) => {
        const productNameLC = device.product.name.toLowerCase();
        const lineNameLC = device.line.name.toLowerCase();
        return (
          productNameLC.includes(searchValueLC) ||
          lineNameLC.includes(searchValueLC)
        );
      });
    }

    setFilteredDevices(devicesCopy);
  }, [devices, filteredLines, searchValue, setFilteredDevices]);
}
