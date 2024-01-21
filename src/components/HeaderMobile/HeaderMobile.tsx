import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { buttonClasses } from '@mui/base/Button';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

export default function HeaderMobile() {
  return (
    <Tabs defaultValue={1}>
      <TabsList>
        <Tab value={1}>Clientes</Tab>
        <Tab value={2}>Endereços</Tab>
        <Tab value={3}>Entregas</Tab>
      </TabsList>
    </Tabs>
  );
}

const blue = {
  100: '#9747FF'
};

const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[100]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[100]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[100]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[100]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.4)' : 'rgba(0,0,0, 0.2)'
  };
  `
);
