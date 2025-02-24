import { config } from '@/config.ts';

interface ImagesUrlPropsI {
  id: string;
  imagesDefault: string;
  size: string;
}

export function generateImagesUrl(props: ImagesUrlPropsI) {
  const imagesUrl = config.imagesUrl;
  Object.entries(props).forEach(([key, value]) => imagesUrl.replace(`$${key}`, value));
  return imagesUrl;
}
