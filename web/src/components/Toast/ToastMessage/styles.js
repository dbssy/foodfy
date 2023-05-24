import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const messageOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary[500]};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success[500]};
`,
  danger: css`
    background: ${({ theme }) => theme.colors.danger[500]};
`,
};

export const Container = styled.div`
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${messageIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${messageOut} 0.2s forwards`};

  svg {
    margin-right: 0.5rem;
  }

  & + & {
    margin-top: 0.75rem;
  }

  ${({ type }) => containerVariants[type] || containerVariants.default};
`;
