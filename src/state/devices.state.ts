import { atom } from 'jotai';

import { DataViewE } from '@/types/enums.ts';
import type { DeviceDataI } from '@/types/types';

export const devicesAtom = atom<DeviceDataI[] | null>(null);
export const filteredDevicesAtom = atom<DeviceDataI[] | null>(null);
export const triggerDevicesFetchAtom = atom(false);
export const devicesLoadErrorAtom = atom<Error | null>(null);
export const devicesLoadingAtom = atom(false);
export const devicesDataViewAtom = atom(DataViewE.List);
export const filteredLinesAtom = atom<string[]>([]);
export const searchValueAtom = atom('');
