import { config } from '@/config';
import type { DevicesResponseI } from '@/types/responses';

export async function getAllDevices(): Promise<DevicesResponseI> {
  return fetch(config.devicesUrl).then((response: Response) => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  });
}
