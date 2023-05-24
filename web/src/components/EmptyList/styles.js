import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg,
  strong {
    color: ${({ theme }) => theme.colors.primary[500]};
  }

  p {
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-top: 0.5rem;
    line-height: 1.5;
    text-align: center;
  }
`;
