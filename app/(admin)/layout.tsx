import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import DashboardLayout from './adminlayoutClient';
import '@mantine/tiptap/styles.css';

export const metadata = {
  title: 'Admin Dashboard',
  description: "CodeInsider's Admin Dashboard",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <section>
      <DashboardLayout currentUser={currentUser}>{children}</DashboardLayout>
    </section>
  );
}
