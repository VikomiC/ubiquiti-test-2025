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

export interface DeviceDataI {
  id: string;
  images: ImagesDataI;
  line: LineDataI;
  product: ProductDataI;
  shortnames: string[];
}
