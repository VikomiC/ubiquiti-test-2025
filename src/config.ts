const { VITE_IMAGES_URL: imagesUrl = '', VITE_DEVICES_URL: devicesUrl = '' } = import.meta.env;

export const config = {
  imagesUrl,
  devicesUrl,
};
