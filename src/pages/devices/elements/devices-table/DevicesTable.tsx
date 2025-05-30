import type { ColumnDef, Row } from '@tanstack/react-table';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { ImageWithFallback } from '@/components/image-with-fallback/ImageWithFallback.tsx';
import { VirtualizedTable } from '@/components/virtualized-table/VirtualizedTable';
import tableStyles from '@/components/virtualized-table/VirtualizedTable.module.css';
import type { ImagesUrlPropsI } from '@/helpers/generateImagesUrl';
import type { DeviceDataI } from '@/types/types';

import styles from './DevicesTable.module.scss';

interface DevicesTablePropsI {
  devices: DeviceDataI[];
}

const columns: ColumnDef<DeviceDataI>[] = [
  {
    id: 'id',
    accessorFn: (row: DeviceDataI): ImagesUrlPropsI => ({
      id: row.id,
      imagesDefault: row.images.default,
      size: '20',
    }),
    header: () => <span className={tableStyles.headerTitle} />,
    cell: (props) => {
      const imageUrlProps = props.getValue() as ImagesUrlPropsI;
      return (
        <div className={styles.imageHolder}>
          <ImageWithFallback
            urlProps={imageUrlProps}
            className={styles.image}
            title={props.cell.row.original.product.name}
            width={20}
            height={20}
          />
        </div>
      );
    },
    size: 36,
    enableSorting: false,
  },
  {
    accessorKey: 'line.name',
    header: () => <span className={tableStyles.headerTitle}>Product Line</span>,
    cell: (props) => {
      const deviceName = props.getValue() as string;
      return <span title={deviceName}>{deviceName}</span>;
    },
    size: 400,
    enableSorting: false,
  },
  {
    accessorKey: 'product.name',
    header: () => <span className={tableStyles.headerTitle}>Name</span>,
    cell: (props) => {
      const productName = props.getValue() as string;
      return <span title={productName}>{productName}</span>;
    },
    enableSorting: false,
  },
];

export const DevicesTable = ({ devices }: DevicesTablePropsI) => {
  const navigate = useNavigate();

  const handleOnRowClick = useCallback(
    (row: Row<DeviceDataI>) => {
      navigate(`/${row.original.id}`);
    },
    [navigate],
  );

  return <VirtualizedTable columns={columns} data={devices} handleOnRowClick={handleOnRowClick} />;
};
