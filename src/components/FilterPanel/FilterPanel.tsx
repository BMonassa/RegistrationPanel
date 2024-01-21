'use client';
import React, { useState } from 'react';
import {
  Button,
  TextField,
  IconButton,
  Popover,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Stack,
  InputAdornment,
  useMediaQuery
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';

import { theme } from '@/constants/colors';

interface Filter {
  columnId: string;
  operator: string;
  value: string;
}

interface FilterPanelProps {
  onRemoveFilter: (index: number) => void;
  onFilterChange: (index: number, filter: Filter) => void;
}
export default function FilterPanel({
  onRemoveFilter,
  onFilterChange
}: FilterPanelProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRegistrationDate, setIsRegistrationDate] = useState(false);
  const [filters, setFilters] = useState([
    { columnId: '', operator: '', value: '' }
  ]);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddFilter = () => {
    const newFilter = { columnId: '', operator: 'e', value: '' };
    setFilters([...filters, newFilter]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveFilter = (index) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
    onRemoveFilter(index);
  };

  const handleRemoveAllFilters = () => {
    filters.forEach((_, index) => {
      onRemoveFilter(index);
    });

    setFilters([]);
  };

  const handleChangeFilter = (index, field, value) => {
    const updatedFilters = [...filters];

    updatedFilters[index] = { ...updatedFilters[index], [field]: value };
    setFilters(updatedFilters);
    onFilterChange(index, updatedFilters[index]);

    if (field === 'columnId') {
      setIsRegistrationDate(value === 'registrationDate');
    }
  };

  return (
    <div>
      <Button
        sx={{
          color: theme.palette.primary.main,
          textTransform: 'none',
          marginRight: '16px'
        }}
        aria-label="Filtro"
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Filtro
        <ExpandMoreIcon />
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box
          className={isSmallScreen ? 'w-[300px]' : 'w-[800px]'}
          sx={{ p: 2 }}
        >
          {filters.map((filter, index) => (
            <Stack
              direction={isSmallScreen ? 'column' : 'row'}
              spacing={2}
              alignItems="cente "
              sx={{ marginTop: 4 }}
              key={index}
            >
              {index !== 0 ? (
                <>
                  <IconButton onClick={() => handleRemoveFilter(index)}>
                    <CloseIcon className="text-customRed" />
                  </IconButton>
                  <div className="flex items-center mx-2 ">
                    <FormControl>
                      <Select
                        className="text-gray-700 border-gray-300 hover:border-blue-300 focus:border-blue-500 w-20"
                        value={filter.condition}
                        onChange={(e) =>
                          handleChangeFilter(index, 'condition', e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem value="e">e</MenuItem>
                        <MenuItem value="ou">ou</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </>
              ) : (
                <Box>
                  <IconButton
                    sx={{ marginRight: 12 }}
                    onClick={() => handleRemoveFilter(index)}
                  >
                    <CloseIcon className="text-customRed" />
                  </IconButton>
                </Box>
              )}

              <FormControl
                className="flex-grow mx-2"
                variant="outlined"
                fullWidth
              >
                <InputLabel className="text-gray-700 border-gray-300 hover:border-blue-300 focus:border-blue-500  ">
                  Coluna
                </InputLabel>

                <Select
                  className="text-gray-700 border-gray-400 focus:border-blue-500 hover:border-gray-500"
                  label="Coluna"
                  value={filter.columnId}
                  onChange={(e) =>
                    handleChangeFilter(index, 'columnId', e.target.value)
                  }
                >
                  <MenuItem value="id">ID</MenuItem>
                  <MenuItem value="name">Nome</MenuItem>
                  <MenuItem value="phone">Telefone</MenuItem>
                  <MenuItem value="registrationDate">Data de cadastro</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                className="text-gray-700 border-gray-300 hover:border-blue-300 focus:border-blue-500 "
                variant="outlined"
                fullWidth
              >
                <Select
                  label=""
                  value={filter.operator}
                  onChange={(e) =>
                    handleChangeFilter(index, 'operator', e.target.value)
                  }
                >
                  <MenuItem value="equals">é</MenuItem>
                  <MenuItem value="contains">Contém</MenuItem>
                </Select>
              </FormControl>
              {isRegistrationDate ? (
                <TextField
                  className="text-gray-700 border-gray-400 focus:border-blue-500 hover:border-gray-500"
                  label="dd/mm/aaaa"
                  variant="outlined"
                  fullWidth
                  value={filter.value}
                  onChange={(e) =>
                    handleChangeFilter(index, 'value', e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EventOutlinedIcon />
                      </InputAdornment>
                    )
                  }}
                />
              ) : (
                <TextField
                  className="text-gray-700 border-gray-400 focus:border-blue-500 hover:border-gray-500"
                  label=""
                  variant="outlined"
                  fullWidth
                  value={filter.value}
                  onChange={(e) =>
                    handleChangeFilter(index, 'value', e.target.value)
                  }
                ></TextField>
              )}
            </Stack>
          ))}
          <div className="flex justify-between mt-4">
            <Button
              sx={{
                color: theme.palette.primary.main,
                textTransform: 'none',
                marginRight: '16px'
              }}
              variant="text"
              startIcon={<AddIcon />}
              onClick={handleAddFilter}
            >
              Adicionar filtro
            </Button>

            <Button
              sx={{
                color: theme.palette.warning.main,
                textTransform: 'none',
                marginRight: '16px'
              }}
              variant="text"
              startIcon={<DeleteForeverOutlinedIcon />}
              onClick={handleRemoveAllFilters}
            >
              Remover todos
            </Button>
          </div>
        </Box>
      </Popover>
    </div>
  );
}
