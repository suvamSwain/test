import { useMemo } from 'react';
import { MaterialReactTable} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export const MatTable = (props) => {
  const data = props.data

  const columns = useMemo(
        () => [
          {
            accessorKey: 'name', //access nested data with dot notation
            header: 'Project Name',
            size: 150,
          },
          {
            accessorKey: 'status',
            header: 'Project Status',
            size: 150,
          },
          {
            accessorKey: 'comments', //normal accessorKey
            header: 'Comments',
            size: 200,
          },
          {
            accessorFn : (row)=>dayjs(row.start_date).format('DD-MM-YYYY'),
            header: 'Start date',
            size: 150,
          },
          {
            accessorFn: (row)=>dayjs(row.end_date).format('DD-MM-YYYY'),
            header: 'End Date',
            size: 150,
          },
        ],
        [],
      );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <IconButton
            color="secondary"
            component = {Link}
            to = {`edit/${row.original.id}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            component = {Link}
            to = {`delete/${row.original.id}`}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};
export default MatTable;