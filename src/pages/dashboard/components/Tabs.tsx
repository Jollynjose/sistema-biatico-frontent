import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';

const DashboardTabs: React.FC = () => {
  const router = useRouter();
  const { section } = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(`/dashboard/${newValue}`);
  };

  return (
    <Tabs value={section || 'users'} onChange={handleTabChange} aria-label="Dashboard Tabs">
      <Tab label="Usuarios" value="users" />
      <Tab label="Puestos de Trabajo" value="job-position" />
      <Tab label="Combustibles" value="fuel" />
    </Tabs>
  );
};

export default DashboardTabs;
