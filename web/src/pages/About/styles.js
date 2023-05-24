import styled from 'styled-components';

export const Container = styled.main`
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }

  p {
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin: 1.25rem 0;
    text-align: justify;
  }
`;
