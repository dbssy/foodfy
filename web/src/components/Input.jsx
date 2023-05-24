import styled, { css } from 'styled-components';

export default styled.input`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  outline: 0;
  transition: border-color 0.2s ease-in;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger[500]};
    border-color: ${theme.colors.danger[500]} !important;
  `}
`;
