import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.danger[500]};
  }

  .details {
    margin-top: 0.5rem;

    strong {
      color: ${({ theme }) => theme.colors.danger[500]};
      font-size: 1.375rem;
      margin-bottom: 0.5rem;
      display: block;
    }

    button {
      margin: auto;
    }
  }
`;
