import { DeviceDataI } from './types.ts';

export interface DevicesResponseI {
  devices: DeviceDataI[];
  version: string;
}
