import classnames from 'classnames';
import { Search } from 'lucide-react';
import { type ChangeEvent, type SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DeviceDataI, SetAtom } from '@/types/types';

import styles from './SearchBar.module.scss';

function highlightMatch(text: string, query: string) {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const key = `${part}.${index * Math.random()}`;
    if (regex.test(part)) {
      return (
        <span key={key} className={styles.highlightedMatch}>
          {part}
        </span>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

interface SearchBarPropsI {
  placeholder?: string;
  value: string;
  setValue: SetAtom<[SetStateAction<string>], void>;
  filteredDevices: DeviceDataI[] | null;
}

export const SearchBar = ({ placeholder, value, setValue, filteredDevices }: SearchBarPropsI) => {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      setIsOpen(true);
    },
    [setValue],
  );

  const handleItemClick = useCallback(
    (device: DeviceDataI) => {
      setValue(device.product.name);
      setIsOpen(false);
    },
    [setValue],
  );

  const visibleDevices = useMemo(() => {
    if (!filteredDevices) {
      return [];
    }
    // Limit to 10 results for better UX
    return filteredDevices.slice(0, 10);
  }, [filteredDevices]);

  return (
    <div className={styles.root}>
      <div className={styles.inputHolder}>
        <div className={styles.iconHolder}>
          <Search className={styles.searchIcon} />
        </div>
        <input
          type="search"
          className={styles.searchInput}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder || 'Search...'}
          ref={inputRef}
        />
      </div>

      {value.trim() !== '' && visibleDevices.length > 0 && (
        <div ref={dropdownRef} className={classnames(styles.dropdown, { [styles.open]: isOpen })}>
          {visibleDevices.map((device) => (
            <div
              key={device.id}
              className={styles.suggestedResult}
              onClick={() => handleItemClick(device)}
              onKeyDown={() => {}}
            >
              <div className={styles.productName}>{highlightMatch(device.product.name, value)}</div>
              <div className={styles.productLine}>{device.line.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
