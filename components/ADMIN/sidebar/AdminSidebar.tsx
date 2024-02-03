'use client';

import { useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem, Box } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import classes from './AdminSidebar.module.scss';

const mainLinksMockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

const linksMockdata = [
  'Analytics',
  'Add blog',
  'See all blogs',
  'users',
  'messages',
  'comments',
  'Clients',
];

export default function AdminSidebar() {
  const [active, setActive] = useState('Releases');
  const [activeLink, setActiveLink] = useState('Settings');
  const router = useRouter();

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => {
    const slug = link.toLowerCase().replace(/ /g, '-');
    return (
      <Box
        className={classes.link}
        data-active={activeLink === link || undefined}
        onClick={(event) => {
          event.preventDefault();
          setActiveLink(link);
          router.push(`/dashboard/${slug}`);
        }}
        key={link}
      >
        {link}
      </Box>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            {/* <MantineLogo type="mark" size={30} /> */}
            CJ
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          {links}
        </div>
      </div>
    </nav>
  );
}
