import type { ColumnDef } from '@tanstack/react-table';

import tableStyles from '@/components/virtualized-table/VirtualizedTable.module.css';
import { VirtualizedTable } from '@/components/virtualized-table/VirtualizedTable.tsx';
import {
  type ImagesUrlPropsI,
  generateImagesUrl,
} from '@/helpers/generateImagesUrl.ts';
import type { DeviceDataI } from '@/types/types.ts';

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
          <img
            src={generateImagesUrl(imageUrlProps)}
            alt={props.cell.row.original.product.name}
            className={styles.image}
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
  },
  {
    accessorKey: 'product.name',
    header: () => <span className={tableStyles.headerTitle}>Name</span>,
    cell: (props) => {
      const productName = props.getValue() as string;
      return <span title={productName}>{productName}</span>;
    },
  },
];

export const DevicesTable = ({ devices }: DevicesTablePropsI) => {
  return <VirtualizedTable columns={columns} data={devices} />;
};
