import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const Overlay = styled.div`
  background: rgba(246, 245, 252, 0.7);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.3s forwards`};
`;
