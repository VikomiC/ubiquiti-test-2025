import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { getAllDevices } from '@/network/public.api';
import { devicesAtom, devicesLoadErrorAtom, devicesLoadingAtom, triggerDevicesFetchAtom } from '@/state/devices.state';

export function useDevicesFetch() {
  const setDevices = useSetAtom(devicesAtom);
  const setDevicesLoadError = useSetAtom(devicesLoadErrorAtom);
  const setDevicesLoading = useSetAtom(devicesLoadingAtom);
  const triggerDevicesFetch = useAtomValue(triggerDevicesFetchAtom);

  const requestSentRef = useRef(false);
  const triggerDevicesFetchRef = useRef(triggerDevicesFetch);

  useEffect(() => {
    if (requestSentRef.current) {
      return;
    }

    triggerDevicesFetchRef.current = triggerDevicesFetch;
    requestSentRef.current = true;
    setDevicesLoadError(null);
    setDevicesLoading(true);

    getAllDevices()
      .then((response) => {
        setDevices(response.devices);
      })
      .catch((err) => {
        setDevicesLoadError(err);
        setDevices(null);
      })
      .finally(() => {
        requestSentRef.current = false;
        setDevicesLoading(false);
      });
  }, [triggerDevicesFetch, setDevicesLoadError, setDevices, setDevicesLoading]);
}
