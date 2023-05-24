import styled from 'styled-components';

export const Container = styled.section``;

export const FlexList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
`;

export const Card = styled.div`
  width: 19rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    transition: all 0.2s ease-in;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
