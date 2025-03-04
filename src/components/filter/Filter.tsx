import classnames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

import styles from './Filter.module.scss';

export const Filter = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={classnames(styles.root, className)} {...rest} />
);
