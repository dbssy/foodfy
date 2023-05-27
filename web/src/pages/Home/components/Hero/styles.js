import styled from 'styled-components';

import background from '@/assets/images/hero-background.jpg';

export const Container = styled.section`
  background: url(${background}) no-repeat;
  background-position: center center;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5rem;
  width: 100%;
  height: 33rem;
  display: flex;
  align-items: center;

  div {
    width: 50%;
    padding: 2rem 0 0 4rem;
    font-size: 1.25rem;
    line-height: 1.2;

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    a {
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      transition: 0.2s ease-in;

      &:hover {
        opacity: 0.8;
        transform: translateX(0.5rem);
      }
    }

    @media screen and (min-width: 320px) and (max-width: 500px) {
      width: 70%;
      font-size: 1rem;

      h1 {
        font-size: 2rem;
      }
    }
  }
`;
