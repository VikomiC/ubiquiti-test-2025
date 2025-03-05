export type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;

export interface LineDataI {
  id: string;
  name: string;
}

export interface ProductDataI {
  abbrev: string;
  name: string;
}

export interface ImagesDataI {
  'left-nopadding'?: string;
  'mobile-connection'?: string;
  'mobile-internet-connected'?: string;
  'mobile-no-internet'?: string;
  'right-nopadding'?: string;
  default: string;
  nopadding: string;
  topology: string;
}

export interface UnifiDataI {
  adoptability: string;
  network: {
    ethernetMaxSpeedMegabitsPerSecond: number;
    numberOfPorts: number;
  };
}

export interface DeviceDataI {
  id: string;
  images: ImagesDataI;
  line: LineDataI;
  product: ProductDataI;
  sku: string;
  shortnames: string[];
  unifi?: UnifiDataI;
}
