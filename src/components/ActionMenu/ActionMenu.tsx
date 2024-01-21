import { useState, MouseEvent} from 'react';

import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  TableCell,
  Typography
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';

import { theme } from '../../constants/colors';

export default function ActionMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableCell align="center">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch'
          }
        }}
      >
        <Box>
          <Typography
            sx={{
              textAling: 'center',
              marginLeft: 2,
              padding: 1,
              color: theme.palette.primary.contrastText
            }}
          >
            Mudar status
          </Typography>
          <MenuItem
            onClick={() => console.log('activate')}
            sx={{
              borderTop: 1,
              borderColor: theme.palette.secondary.contrastText
            }}
          >
            <Box
              sx={{
                color: theme.palette.success.main,
                display: 'flex',
                paddingTop: 2
              }}
            >
              <CheckCircleOutlineIcon />
              <Typography sx={{ paddingLeft: 2 }}>Ativar</Typography>
            </Box>
          </MenuItem>

          <Box
            sx={{
              color: theme.palette.warning.main,
              paddingTop: 2
            }}
          >
            <MenuItem onClick={() => console.log('inactivate')}>
              <BlockIcon />
              <Typography sx={{ paddingLeft: 2 }}>Inativar</Typography>
            </MenuItem>
          </Box>
        </Box>
      </Menu>
    </TableCell>
  );
}
