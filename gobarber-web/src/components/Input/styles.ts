import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

// Move the styles that were inside the input to the container, so that the icon is 'inside' the input
// The icon is on the left side of the input
export const Container = styled.div<ContainerProps>`
    background: #232129;
    border-radius: 10px;
    padding: 16px;
    color: #666360;
    border: 2px solid #232129;
    width: 100%;
    display: flex;
    align-items: center;

    /* Todo div(Container) precedido por outro div */
    & + div {
        margin-top: 8px;
    }

    svg {
        margin-right: 16px;
    }

    /* Put above the focus styles, so that when there is a error and we focus, the border will go from red to orange */
    ${props =>
      props.isErrored &&
      css`
        border-color: #c53030;
      `}

    /* When the input is on focus */
    ${props =>
      props.isFocused &&
      css`
        color: #ff9000;
        border-color: #ff9000;
      `}

    /* When the input has no focus but has content */
    ${props =>
      props.isFilled &&
      css`
        color: #ff9000;
      `}

    input {
        color: #f4ede8;
        flex: 1;
        background: transparent;
        border: 0;

        &::placeholder {
            color: #666360;
        }
    }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  /* Make the tooltip for errors red */
  span {
    background: #c53030;
    color: #fff;

    /* Make arrow red */
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
