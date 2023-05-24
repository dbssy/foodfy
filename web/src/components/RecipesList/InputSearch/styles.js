import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  input {
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    border: none;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    outline: 0;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[300]};
    }
  }
`;
