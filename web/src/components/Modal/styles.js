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

const scaleIn = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

const scaleOut = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
`;

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.2s forwards`};
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 0.25rem;
  width: 100%;
  max-width: 28.125rem;
  padding: 1.5rem;
  animation: ${scaleIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${scaleOut} 0.2s forwards`};

  > h1 {
    color: ${({ theme, danger }) => (danger ? theme.colors.danger[500] : theme.colors.gray[900])};
    font-size: 1.5rem;
  }

  .modal-body {
    margin-top: 2rem;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2rem;

  .cancel-button {
    background: transparent;
    color: ${({ theme }) => theme.colors.gray[300]};
    margin-right: 1.5rem;

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
