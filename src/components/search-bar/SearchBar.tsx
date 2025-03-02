import { Search } from 'lucide-react';

import styles from './SearchBar.module.scss';

interface SearchBarPropsI {
  placeholder?: string;
}

export const SearchBar = ({ placeholder }: SearchBarPropsI) => {
  return (
    <div className={styles.root}>
      <div className={styles.iconHolder}>
        <Search className={styles.searchIcon} />
      </div>
      <input
        type="search"
        className={styles.searchInput}
        placeholder={placeholder || 'Search...'}
      />
    </div>
  );
};
