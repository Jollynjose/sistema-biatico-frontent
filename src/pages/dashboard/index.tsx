import React, { ReactNode, useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Users from './users';
import Fuels from './fuels';
import JobPositions from './job-positions';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoadingBackdrop from '@/components/LoadingBackdrop';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  if (status === 'loading' || status === 'unauthenticated')
    return <LoadingBackdrop />;

  const tabComponents: ReactNode[] = [
    <Users key="user-tab" />,
    <Fuels key="fuel-tab" />,
    <JobPositions key="job-tab" />,
  ];

  return (
    <DefaultLayout>
      <Box sx={{ width: '100%', backgroundColor: '#f5f5f5' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
        >
          <Tab label="Usuarios" />
          <Tab label="Combustibles" />
          <Tab label="Posiciones de Trabajo" />
        </Tabs>
        <Box sx={{ padding: 2 }}>{tabComponents[selectedTab]}</Box>
      </Box>
    </DefaultLayout>
  );
};

export default Dashboard;
