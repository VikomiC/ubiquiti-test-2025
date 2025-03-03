import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

import GridIcon from '@/assets/icons/grid.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import { ErrorBlock } from '@/components/error-block/ErrorBlock';
import { LoadingBlock } from '@/components/loading-block/LoadingBlock';
import { SearchBar } from '@/components/search-bar/SearchBar';
import { useDevicesFetch } from '@/pages/devices/hooks/useDevicesFetch';
import {
  devicesAtom,
  devicesDataViewAtom,
  devicesLoadErrorAtom,
  devicesLoadingAtom,
  triggerDevicesFetchAtom,
} from '@/state/devices.state';

import { Button } from '@/components/button/Button.tsx';
import { DataViewE } from '@/types/enums.ts';
import classnames from 'classnames';
import styles from './Devices.module.scss';

export const Devices = () => {
  const devices = useAtomValue(devicesAtom);
  const devicesLoading = useAtomValue(devicesLoadingAtom);
  const devicesLoadError = useAtomValue(devicesLoadErrorAtom);
  const [devicesDataView, setDevicesDataView] = useAtom(devicesDataViewAtom);
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
        <div className={styles.filtersBlock}>
          <div className={styles.dataView}>
            <button
              className={classnames(styles.iconHolder, {
                [styles.selected]: devicesDataView === DataViewE.List,
              })}
              onClick={() => setDevicesDataView(DataViewE.List)}
            >
              <ListIcon />
            </button>
            <button
              className={classnames(styles.iconHolder, {
                [styles.selected]: devicesDataView === DataViewE.Grid,
              })}
              onClick={() => setDevicesDataView(DataViewE.Grid)}
            >
              <GridIcon />
            </button>
          </div>
          <div>
            <Button>Filter</Button>
          </div>
        </div>
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
