import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;
    width: 160px;
    position: absolute;
    bottom: calc(100% + 12px);
    /* Centralize div relative to the element that is bellow */
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    /* Make the error span have an arrow bellow it, like its coming out of the error icon */
    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      /* Make an arrow */
      border-width: 6px 6px 0 6px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  /* Show error span when hover over icon */
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
