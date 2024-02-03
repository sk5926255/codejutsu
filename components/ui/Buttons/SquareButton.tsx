import { Button } from '@mantine/core';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant: string;
  background?: string;
  type?: 'button' | 'submit' | 'reset';
};

const SquareButton: React.FC<ButtonProps> = ({ label, onClick, variant, background, type }) => (
  <Button
    type={type}
    variant={variant}
    style={{ borderRadius: '0' }}
    onClick={onClick}
    bg={background}
  >
    {label}
  </Button>
);
export default SquareButton;
