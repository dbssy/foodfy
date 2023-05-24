import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  span {
    color: ${({ theme }) => theme.colors.gray[500]};
    word-break: break-word;
    margin-left: 1.5rem;

    strong {
      color: ${({ theme }) => theme.colors.primary[500]};
    }
  }
`;
