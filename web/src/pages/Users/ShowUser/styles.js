import styled from 'styled-components';

export const Container = styled.main``;

export const Section = styled.section`
  header {
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 1rem;

    span {
      color: ${({ theme }) => theme.colors.primary[500]};
    }

    div {
      display: flex;
      gap: 1rem;

      a {
        color: ${({ theme }) => theme.colors.primary[500]};
        font-weight: 500;

        &:hover {
          color: ${({ theme }) => theme.colors.primary[300]};
          transition: color 0.2s ease-in;
        }
      }

      button {
        color: ${({ theme }) => theme.colors.danger[500]};
        font-weight: 500;

        &:hover {
          color: ${({ theme }) => theme.colors.danger[300]};
          transition: color 0.2s ease-in;
        }
      }
    }
  }

  .details {
    text-align: center;

    img {
      width: 16rem;
      height: 16rem;
      border-radius: 50%;
    }

    p {
      color: ${({ theme }) => theme.colors.gray[500]};
      margin-top: 0.5rem;
    }
  }
`;
