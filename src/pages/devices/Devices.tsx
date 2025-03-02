import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

import { ErrorBlock } from '@/components/error-block/ErrorBlock';
import { LoadingBlock } from '@/components/loading-block/LoadingBlock';
import { SearchBar } from '@/components/search-bar/SearchBar';
import { useDevicesFetch } from '@/pages/devices/hooks/useDevicesFetch';
import {
  devicesAtom,
  devicesLoadErrorAtom,
  devicesLoadingAtom,
  triggerDevicesFetchAtom,
} from '@/state/devices.state';

import styles from './Devices.module.scss';

export const Devices = () => {
  const devices = useAtomValue(devicesAtom);
  const devicesLoading = useAtomValue(devicesLoadingAtom);
  const devicesLoadError = useAtomValue(devicesLoadErrorAtom);
  const setTriggerDevicesFetch = useSetAtom(triggerDevicesFetchAtom);

  useDevicesFetch();

  const handleDataReload = useCallback(() => {
    setTriggerDevicesFetch((prevState) => !prevState);
  }, [setTriggerDevicesFetch]);

  const isPlural = useMemo(() => {
    if (!devices) {
      return true;
    }

    const enCardinalRules = new Intl.PluralRules('en-US');
    return enCardinalRules.select(devices.length) !== 'one';
  }, [devices]);

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <div className={styles.searchHolder}>
          <SearchBar placeholder="Search" />
          {devices != null && (
            <div className={styles.devicesCount}>
              {devices.length} Device{isPlural ? 's' : ''}
            </div>
          )}
        </div>
        <div className={styles.filtersBlock}>Filters</div>
      </div>
      <div className={styles.content}>
        {devices === null && devicesLoadError !== null && (
          <ErrorBlock
            error={devicesLoadError}
            reloadCallback={handleDataReload}
          />
        )}
        {devices === null && devicesLoading && <LoadingBlock />}
      </div>
    </div>
  );
};
