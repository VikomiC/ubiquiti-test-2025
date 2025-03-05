import { useCallback, useEffect, useState } from 'react';

import { generateImagesUrl } from '@/helpers/generateImagesUrl.ts';
import type { DeviceDataI } from '@/types/types.ts';

import styles from './DeviceBlock.module.scss';

interface DeviceBlockPropsI {
  device: DeviceDataI;
}

export const DeviceBlock = ({ device }: DeviceBlockPropsI) => {
  const [jsonResult, setJsonResult] = useState<string | null>(null);

  const showJSON = useCallback(() => {
    setJsonResult(JSON.stringify(device, null, 4));
  }, [device]);

  // biome-ignore lint/correctness/useExhaustiveDependencies(device): Listen for device changes
  useEffect(() => {
    setJsonResult(null);
  }, [device]);

  return (
    <div className={styles.root}>
      <div className={styles.deviceData}>
        <div className={styles.imageBlock}>
          <img
            src={generateImagesUrl({
              id: device.id,
              imagesDefault: device.images.default,
              size: '260',
            })}
            alt={device.product.name}
            className={styles.image}
          />
        </div>
        <div className={styles.detailsBlock}>
          <div className={styles.heading}>
            <div className={styles.title}>{device.product.name}</div>
            <div className={styles.lineName}>{device.line.name}</div>
          </div>
          <div className={styles.lines}>
            <div className={styles.line} key="line">
              <div className={styles.label}>Product Line</div>
              <div className={styles.value}>{device.line.name}</div>
            </div>
            <div className={styles.line} key="id">
              <div className={styles.label}>ID</div>
              <div className={styles.value}>{device.id}</div>
            </div>
            <div className={styles.line} key="sku">
              <div className={styles.label}>SKU</div>
              <div className={styles.value}>{device.sku}</div>
            </div>
            <div className={styles.line} key="name">
              <div className={styles.label}>Name</div>
              <div className={styles.value}>{device.product.name}</div>
            </div>
            <div className={styles.line} key="shortname">
              <div className={styles.label}>Short Name</div>
              <div className={styles.value}>{device.shortnames[0]}</div>
            </div>
            {device.unifi?.network.ethernetMaxSpeedMegabitsPerSecond && (
              <div className={styles.line} key="max-speed">
                <div className={styles.label}>Speed</div>
                <div className={styles.value}>{device.unifi.network.ethernetMaxSpeedMegabitsPerSecond} Mbps</div>
              </div>
            )}
            {device.unifi?.network.numberOfPorts && (
              <div className={styles.line} key="number-of-ports">
                <div className={styles.label}>Number of Ports</div>
                <div className={styles.value}>{device.unifi.network.numberOfPorts}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.allDetailsBlock}>
        <button className={styles.callToAction} onClick={showJSON}>
          See All Details as JSON
        </button>
        {jsonResult !== null && (
          <div className={styles.jsonResult}>
            <pre>{jsonResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
