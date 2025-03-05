import { useAtomValue } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

import LeftIcon from '@/assets/icons/left.svg?react';
import RightIcon from '@/assets/icons/right.svg?react';
import { Button } from '@/components/button/Button.tsx';
import { DeviceBlock } from '@/pages/device-view/elements/device-block/DeviceBlock.tsx';
import { DeviceNotFound } from '@/pages/device-view/elements/device-not-found/DeviceNotFound.tsx';
import { filteredDevicesAtom } from '@/state/devices.state.ts';
import type { DeviceDataI } from '@/types/types.ts';

import styles from './ViewDevice.module.scss';

interface FoundDevicesI {
  previous: DeviceDataI | null;
  current: DeviceDataI | null;
  next: DeviceDataI | null;
}

const NOT_FOUND_DEVICES: FoundDevicesI = {
  previous: null,
  current: null,
  next: null,
};

export const ViewDevice = () => {
  const filteredDevices = useAtomValue(filteredDevicesAtom);

  const navigate = useNavigate();
  const { deviceId } = useParams();

  const devices: FoundDevicesI = useMemo(() => {
    if (!filteredDevices) {
      return NOT_FOUND_DEVICES;
    }

    const foundIndex = filteredDevices.findIndex(({ id }) => id === deviceId);
    if (foundIndex === -1) {
      return NOT_FOUND_DEVICES;
    }

    return {
      previous: foundIndex > 0 ? filteredDevices[foundIndex - 1] : null,
      current: filteredDevices[foundIndex],
      next: foundIndex < filteredDevices.length - 1 ? filteredDevices[foundIndex + 1] : null,
    };
  }, [filteredDevices, deviceId]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handlePrevDevice = useCallback(() => {
    if (devices.previous?.id) {
      navigate(`/${devices.previous.id}`, { replace: true });
    }
  }, [navigate, devices.previous?.id]);

  const handleNextDevice = useCallback(() => {
    if (devices.next?.id) {
      navigate(`/${devices.next.id}`, { replace: true });
    }
  }, [navigate, devices.next?.id]);

  return (
    <>
      <div className={styles.heading}>
        <Button onClick={handleBack}>
          <LeftIcon /> Back
        </Button>
        <div className={styles.navButtons}>
          <Button onClick={handlePrevDevice} disabled={devices.previous === null}>
            <LeftIcon />
          </Button>
          <Button onClick={handleNextDevice} disabled={devices.next === null}>
            <RightIcon />
          </Button>
        </div>
      </div>
      {devices.current === null && <DeviceNotFound />}
      {devices.current !== null && <DeviceBlock device={devices.current} />}
    </>
  );
};
