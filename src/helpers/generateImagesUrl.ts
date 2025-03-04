import { config } from '@/config';

export interface ImagesUrlPropsI {
  id: string;
  imagesDefault: string;
  size: string;
}

export function generateImagesUrl(props: ImagesUrlPropsI) {
  let imagesUrl = config.imagesUrl.slice();
  for (const [key, value] of Object.entries(props)) {
    imagesUrl = imagesUrl.replace(`{${key}}`, value);
  }
  return imagesUrl;
}
