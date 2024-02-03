import { Box } from '@mantine/core';
import Link from 'next/link';

type ButtonProps = {
  label: string;
  link: string;
};

const SquareButton: React.FC<ButtonProps> = ({ label, link }) => (
  <Box component={Link} href={link}>
    {label}
  </Box>
);
export default SquareButton;
