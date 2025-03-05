import { Search } from 'lucide-react';
import type { ChangeEvent, SetStateAction } from 'react';

import type { SetAtom } from '@/types/types';

import styles from './SearchBar.module.scss';

interface SearchBarPropsI {
  placeholder?: string;
  value: string;
  setValue: SetAtom<[SetStateAction<string>], void>;
}

export const SearchBar = ({ placeholder, value, setValue }: SearchBarPropsI) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.iconHolder}>
        <Search className={styles.searchIcon} />
      </div>
      <input
        type="search"
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
        placeholder={placeholder || 'Search...'}
      />
    </div>
  );
};
