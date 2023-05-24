import styled from 'styled-components';

export const Container = styled.section``;

export const FlexList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
`;

export const Card = styled.div`
  width: 19rem;

  img {
    width: 100%;
    height: 12rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .info {
    h3 {
      margin-bottom: 0.5rem;
    }

    p {
      color: ${({ theme }) => theme.colors.gray[300]};
      font-size: 0.875rem;
      display: block;

      a {
        color: ${({ theme }) => theme.colors.gray[500]};
      }
    }
  }
`;
