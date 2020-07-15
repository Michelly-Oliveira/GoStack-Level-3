import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...restOfProps }) => (
  <Container type="button" {...restOfProps}>
    {children}
  </Container>
);

export default Button;
