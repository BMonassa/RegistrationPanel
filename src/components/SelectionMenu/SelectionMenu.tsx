
import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  Radio
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '@/constants/colors';

interface SelectionMenuProps {
  columns: any;
  onSort: any;
  sortConfig: any;
}

export default function SelectionMenu({
  columns,
  sortConfig,
  onSort
}: SelectionMenuProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (property) => {
    onSort(property);
    handleClose();
  };

  return (
    <Box>
      <Button
        sx={{
          color: theme.palette.primary.main,
          textTransform: 'none',
          marginRight: '16px'
        }}
        aria-label="Ordenar por"
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Ordenar por
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {columns.map((column) => (
          <MenuItem
            key={column.id}
            selected={sortConfig && sortConfig.key === column.id}
            onClick={() => handleMenuItemClick(column.id)}
          >
            <Radio
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': {
                  color: '#9747FF'
                }
              }}
              checked={
                sortConfig &&
                sortConfig.key === column.id &&
                sortConfig.direction !== 'none'
              }
            />
            <ListItemText primary={column.label} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
