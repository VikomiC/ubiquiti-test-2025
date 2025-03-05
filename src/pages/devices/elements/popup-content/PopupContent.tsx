import classnames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import { type ChangeEvent, type MouseEvent, useCallback, useMemo } from 'react';

import { devicesAtom, filteredLinesAtom } from '@/state/devices.state';

import styles from './PopupContent.module.scss';

export const PopupContent = () => {
  const devices = useAtomValue(devicesAtom);
  const [filteredLines, setFilteredLines] = useAtom(filteredLinesAtom);

  const lines = useMemo(() => {
    if (!devices) {
      return [];
    }
    const allLines = devices.map(({ line }) => line.name);
    return [...new Set(allLines)];
  }, [devices]);

  const toggleFilter = useCallback(
    (toggleLine: string) => {
      setFilteredLines((lines) => {
        const foundLineIndex = lines.findIndex((line) => toggleLine === line);
        if (foundLineIndex === -1) {
          return [...lines, toggleLine];
        }
        return lines.filter((line) => toggleLine !== line);
      });
    },
    [setFilteredLines],
  );

  const toggleFilterOnCheckbox = useCallback(
    (toggleLine: string) => (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      toggleFilter(toggleLine);
    },
    [toggleFilter],
  );

  const toggleFilterOnLabel = useCallback(
    (toggleLine: string) => (event: MouseEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      toggleFilter(toggleLine);
    },
    [toggleFilter],
  );

  const clearFilters = useCallback(() => {
    setFilteredLines([]);
  }, [setFilteredLines]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>Product Line</div>
      <div className={styles.content}>
        {lines.map((line) => (
          <div className={styles.line} key={line}>
            <input
              type="checkbox"
              id={line}
              checked={filteredLines.includes(line)}
              onChange={toggleFilterOnCheckbox(line)}
            />
            <label htmlFor={line} onClick={toggleFilterOnLabel(line)} onKeyDown={() => {}}>
              {line}
            </label>
          </div>
        ))}
      </div>
      <div
        className={classnames(styles.footer, { [styles.disabled]: filteredLines.length === 0 })}
        onClick={clearFilters}
        onKeyDown={() => {}}
      >
        Reset
      </div>
    </div>
  );
};
