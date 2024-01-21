import React from 'react';

import TextField from '@mui/material/TextField';

import useMediaQuery from '@mui/material/useMediaQuery';

interface TableFilterProps {
  filterText: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  filterText,
  onFilterChange
}: TableFilterProps) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div className={isSmallScreen ? 'mt-8' : 'mr-4'}>
      <TextField
        name="filterText"
        value={filterText}
        onChange={onFilterChange}
        variant="outlined"
        size="small"
        fullWidth
        placeholder="Pesquisar ID ou nome ou telefone..."
        sx={{
          width: '300px',
          '& .MuiInputBase-root': {
            height: '40px'
          },
          '& .MuiOutlinedInput-input': {
            padding: '10px 14px'
          },

          '& .MuiInputBase-input': {
            fontSize: '0.875rem'
          }
        }}
      />
    </div>
  );
}
