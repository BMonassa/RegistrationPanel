import { useState, ChangeEvent } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Menu,
  useMediaQuery
} from '@mui/material';

import ActionMenu from '../ActionMenu/ActionMenu';
import ChipButton from '../ChipButton/ChipButton';
import SearchBar from '../SearchBar/SearchBar';
import FilterPanel from '../FilterPanel/FilterPanel';
import SelectionMenu from '../SelectionMenu/SelectionMenu';

import { useSortableData } from '../../hooks/useSortableData';
import useFilter from '../../hooks/useFilter';

import { theme } from '@/constants/colors';

interface Column {
  id: 'id' | 'name' | 'phone' | 'registrationDate' | 'status' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Nome', minWidth: 100 },
  {
    id: 'phone',
    label: 'Telefone',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'registrationDate',
    label: 'Data de cadastro',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'center'
  }
];

interface Data {
  id: number;
  name: string;
  phone: string;
  registrationDate: string;
  status: string;
  actions?: any;
}

interface Filter {
  columnId: keyof Data;
  operator: 'equals' | 'contains';
  value: string;
}

interface props {
  data: [];
}

export default function UserTable({ data }: props) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filterText, setFilterText] = useState<string>('');
  const [filters, setFilters] = useState<Filter[]>([]);

  const { items: sortedData, requestSort, sortConfig } = useSortableData(data);
  const filteredData = useFilter(sortedData || [], filterText, filters);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const onAddFilter = (newFilter: Filter): void => {
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (index: number): void => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const handleRequestSort = (property) => {
    requestSort(property);
  };

  const handleFilterTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleAdvancedFilterChange = (
    index: number,
    updatedFilter: Filter
  ): void => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
  };

  const convertDateToBRFormat = (dateString: string): string => {
    if (!dateString) return '';
    return dateString.replace(/-/g, '/');
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter(
      (_, filterIndex) => filterIndex !== index
    );
    setFilters(newFilters);
  };

  const handleFilterChange = (index, updatedFilter) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
      <Box
        className={
          isSmallScreen
            ? 'flex flex-wrap items-center justify-center'
            : 'flex flex-wrap items-center justify-start'
        }
      >
        <SearchBar
          filterText={filterText}
          onFilterChange={handleFilterTextChange}
        />
        <Menu
          filters={filters}
          onFilterChange={handleAdvancedFilterChange}
          onAddFilter={onAddFilter}
          onRemoveFilter={removeFilter}
          onClearFilters={undefined}
        />
        <SelectionMenu
          columns={columns}
          onSort={handleRequestSort}
          sortConfig={sortConfig}
        />
        <FilterPanel
          onRemoveFilter={handleRemoveFilter}
          onFilterChange={handleFilterChange}
        />
      </Box>

      <TableContainer
        sx={{
          maxHeight: 560,
          border: 'none',
          overflowY: 'hidden'
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  onClick={() => requestSort(column.id)}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center" style={{ minWidth: 100 }}></TableCell>{' '}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const adjustedIndex = index + page * rowsPerPage;
                const colorPattern = [
                  'white',
                  'gray',
                  'gray',
                  'white',
                  'white',
                  'gray'
                ];
                const patternIndex = adjustedIndex % colorPattern.length;
                const backgroundColor =
                  colorPattern[patternIndex] === 'gray' ? '#F6F6F6' : '#FFFFFF';

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ backgroundColor: backgroundColor }}
                  >
                    {columns.map((column) => {
                      const value =
                        column.id === 'registrationDate'
                          ? convertDateToBRFormat(row[column.id])
                          : row[column.id];

                      if (column.id === 'status') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <ChipButton status={value} />
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <ActionMenu />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
        sx={{ color: theme.palette.primary.light }}
      />
    </Paper>
  );
}
