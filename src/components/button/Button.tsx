import classnames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export const Button = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={classnames(styles.root, className)} {...rest} />
);
