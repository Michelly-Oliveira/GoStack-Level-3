import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  text: string;
  // Use className to have access to the styles from the Input Error
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{text}</span>
    </Container>
  );
};

export default Tooltip;
