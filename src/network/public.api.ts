import { config } from '../config.ts';
import type { DevicesResponseI } from '../types/responses.ts';

export async function getAllDevices(): Promise<DevicesResponseI> {
  return fetch(config.devicesUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(async (response: Response) => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  });
}
