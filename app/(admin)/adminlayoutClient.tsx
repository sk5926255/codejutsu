'use client';

import React from 'react';
import { AppShell, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AdminSidebar from '@/components/ADMIN/sidebar/AdminSidebar';
import { CurrentUserType } from '@/types';
import AdminHeader from '@/components/ADMIN/header/AdminHeader';

interface Props {
  children: React.ReactNode;
  currentUser: CurrentUserType | null;
}

const DashboardLayout = ({ children, currentUser }: Props) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <section>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Flex align="center" gap="md" h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <AdminHeader currentUser={currentUser} />
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar>
          <AdminSidebar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </section>
  );
};

export default DashboardLayout;
