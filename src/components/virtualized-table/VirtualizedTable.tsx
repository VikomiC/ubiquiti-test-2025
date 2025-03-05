import {
  type ColumnDef,
  type Row,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import classnames from 'classnames';
import { type CSSProperties, type ReactNode, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import styles from './VirtualizedTable.module.css';

interface VirtualizedTablePropsI<T> {
  columns: ColumnDef<T>[];
  data: T[];
  emptyState?: ReactNode;
  holderClassname?: string;
  handleOnRowClick?: (row: Row<T>) => void;
}

export const TableEmptyStateWrapper = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <tbody style={{ height: '100%' }}>
    <tr style={{ height: '100%' }}>
      <td
        style={{
          textAlign: 'center',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }}
      >
        {children}
      </td>
    </tr>
  </tbody>
);
const defaultEmptyState = <TableEmptyStateWrapper>No data here</TableEmptyStateWrapper>;

function calculateFlexibleColumnWidths<T>(containerWidth: number, columns: ColumnDef<T>[]) {
  const MOBILE_BREAKPOINT = 768;
  const isMobile = containerWidth <= MOBILE_BREAKPOINT;
  if (isMobile) {
    const widthMobile = Math.floor(containerWidth / columns.length);
    const mobileColumnWidth = widthMobile > 140 ? widthMobile : 140;
    return columns.map(() => mobileColumnWidth);
  }
  const totalFixedWidth = columns.reduce((sum, col) => {
    const size = col.size as number;
    return size !== Number.MAX_SAFE_INTEGER ? sum + size : sum;
  }, 0);

  const flexibleColumns = columns.filter((col) => (col.size as number) === Number.MAX_SAFE_INTEGER).length;

  const remainingWidth = Math.max(0, containerWidth - totalFixedWidth);
  const flexibleColumnWidth = flexibleColumns > 0 ? Math.floor(remainingWidth / flexibleColumns) : 0;

  return columns.map((col) => {
    const size = col.size as number;
    return size === Number.MAX_SAFE_INTEGER ? flexibleColumnWidth : size;
  });
}

export function VirtualizedTable<T>({
  columns,
  data,
  emptyState,
  holderClassname,
  handleOnRowClick,
}: VirtualizedTablePropsI<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { ref, width = 0 } = useResizeDetector();
  const columnWidths = calculateFlexibleColumnWidths(width, columns);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true,
    defaultColumn: {
      size: Number.MAX_SAFE_INTEGER,
    },
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 56,
    getScrollElement: () => tableContainerRef.current,
    // Measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div className={classnames(styles.tableHolder, holderClassname)} ref={tableContainerRef}>
      <table
        className={styles.table}
        ref={ref}
        style={
          data.length === 0
            ? {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }
            : {}
        }
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const columnWidth = columnWidths[index];
                const sortHandler =
                  {
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null;

                return (
                  <th
                    key={header.id}
                    style={{
                      width: columnWidth,
                      minWidth: columnWidth,
                      maxWidth: columnWidth,
                    }}
                  >
                    <div
                      {...{
                        className: classnames(styles.headerCell, header.column.getCanSort() ? styles.selectCursor : ''),
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {sortHandler && <span className={styles.sortHandle}>{sortHandler}</span>}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        {data.length === 0 ? (
          (emptyState ?? defaultEmptyState)
        ) : (
          <tbody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<T>;
              return (
                <tr
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                  key={row.id}
                  className={classnames({
                    [styles.clickableRow]: !!handleOnRowClick,
                  })}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                  }}
                  onClick={handleOnRowClick ? () => handleOnRowClick(row) : undefined}
                  onKeyDown={() => {}}
                  tabIndex={virtualRow.index}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const columnWidth = columnWidths[index];
                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: columnWidth,
                          minWidth: columnWidth,
                          maxWidth: columnWidth,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}
