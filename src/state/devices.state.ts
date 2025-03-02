import { atom } from 'jotai';

import type { DeviceDataI } from '@/types/types';

export const devicesAtom = atom<DeviceDataI[] | null>(null);
export const triggerDevicesFetchAtom = atom(false);
export const devicesLoadErrorAtom = atom<Error | null>(null);
export const devicesLoadingAtom = atom(false);
