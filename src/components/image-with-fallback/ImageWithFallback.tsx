import { Suspense, useState } from 'react';

import ImageFallback from '@/assets/icons/image-fallback.svg?react';
import { type ImagesUrlPropsI, generateImagesUrl } from '@/helpers/generateImagesUrl';

import styles from './ImageWithFallback.module.scss';

interface ImageWithFallbackPropsI {
  urlProps: ImagesUrlPropsI;
  className: string;
  title: string;
  width: number;
  height: number;
}

export const ImageWithFallback = ({ urlProps, className, title, width, height }: ImageWithFallbackPropsI) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Suspense
      fallback={
        <div className={styles.fallback} style={{ width, height }}>
          <ImageFallback />
        </div>
      }
    >
      {hasError && (
        <div className={styles.fallback} style={{ width, height }}>
          <ImageFallback />
        </div>
      )}
      {!hasError && (
        <img
          src={generateImagesUrl(urlProps)}
          alt={title}
          className={className}
          onError={() => {
            setHasError(true);
          }}
        />
      )}
    </Suspense>
  );
};
