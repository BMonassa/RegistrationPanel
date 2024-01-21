import { useState } from 'react';

import { Tabs, Tab, Typography, Box, useMediaQuery } from '@mui/material';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { theme } from '@/constants/colors';
import HeaderMobile from '../HeaderMobile/HeaderMobile';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function Header() {
  const [value, setValue] = useState(1);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', alignItems: 'center' }}>
      <div>
        {isSmallScreen ? (
          <HeaderMobile />
        ) : (
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ marginLeft: 4, marginRight: 4 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab
                  label="Logo"
                  {...a11yProps(0)}
                  disabled={true}
                  sx={{ fontSize: 20, fontWeight: 'bold' }}
                />

                <Tab
                  label="Clientes"
                  {...a11yProps(1)}
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  label="Endereços"
                  {...a11yProps(2)}
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  label="Entregas"
                  {...a11yProps(3)}
                  sx={{ textTransform: 'none' }}
                />

                <Tab
                  icon={<AccountCircleOutlinedIcon />}
                  {...a11yProps(4)}
                  className=" absolute right-0"
                />
              </Tabs>
            </Box>
          </Box>
        )}
      </div>

      {!isSmallScreen ? (
        <Box sx={{ marginLeft: 3 }}>
          <CustomTabPanel value={value} index={1}>
            <Typography
              sx={{
                fontSize: 24,
                color: theme.palette.primary.contrastText,
                marginTop: 2
              }}
            >
              Usuários
            </Typography>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Typography
              sx={{
                fontSize: 24,
                color: theme.palette.primary.contrastText,
                marginTop: 2
              }}
            >
              Endereços
            </Typography>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Typography
              sx={{
                fontSize: 24,
                color: theme.palette.primary.contrastText,
                marginTop: 2
              }}
            >
              Entregas
            </Typography>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Typography
              sx={{
                fontSize: 24,
                color: theme.palette.primary.contrastText,
                marginTop: 2
              }}
            >
              Sobre
            </Typography>
          </CustomTabPanel>
        </Box>
      ) : null}
    </Box>
  );
}
