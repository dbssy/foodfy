import styled from 'styled-components';

export const Container = styled.main``;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form,
  header {
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  gap: 2rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primary[500]};
      transition: color 0.2s ease-in;
    }
  }

  .outline {
    background: none;
    color: ${({ theme }) => theme.colors.danger[500]};
    border: 2px solid ${({ theme }) => theme.colors.danger[500]};
    border-radius: 0.25rem;
    width: ${({ buttonSize }) => buttonSize}%;
    height: 3rem;
    padding: 0 2rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease-in;

    &:hover {
      background-color: ${({ theme }) => theme.colors.danger[300]};
      border-color: ${({ theme }) => theme.colors.danger[300]};
      color: ${({ theme }) => theme.colors.white};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.danger[900]};
      border-color: ${({ theme }) => theme.colors.danger[900]};
    }
  }
`;
