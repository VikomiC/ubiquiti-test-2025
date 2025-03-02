import type { DeviceDataI } from './types';

export interface DevicesResponseI {
  devices: DeviceDataI[];
  version: string;
}
