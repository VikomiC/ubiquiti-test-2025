import { config } from '@/config';

interface ImagesUrlPropsI {
  id: string;
  imagesDefault: string;
  size: string;
}

export function generateImagesUrl(props: ImagesUrlPropsI) {
  const imagesUrl = config.imagesUrl;
  for (const [key, value] of Object.entries(props)) {
    imagesUrl.replace(`$${key}`, value);
  }
  return imagesUrl;
}
