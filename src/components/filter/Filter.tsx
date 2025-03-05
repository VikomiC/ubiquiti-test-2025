import classnames from 'classnames';
import { type ButtonHTMLAttributes, type MouseEvent, type ReactNode, useCallback, useEffect, useState } from 'react';

import styles from './Filter.module.scss';

interface FilterPropsI extends ButtonHTMLAttributes<HTMLButtonElement> {
  popupContent: ReactNode;
}

export const Filter = ({ popupContent, className, ...rest }: FilterPropsI) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function closePopup() {
      setIsOpen(false);
    }

    if (isOpen) {
      window.addEventListener('click', closePopup);
    }

    return () => {
      window.removeEventListener('click', closePopup);
    };
  }, [isOpen]);

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <div className={styles.root}>
      <button
        className={classnames(styles.button, className, { [styles.open]: isOpen })}
        {...rest}
        onClick={toggleOpen}
      >
        Filter
      </button>

      <div
        className={classnames(styles.optionsPopup, { [styles.open]: isOpen })}
        onClick={handleClick}
        onKeyDown={() => {}}
      >
        {popupContent}
      </div>
    </div>
  );
};
