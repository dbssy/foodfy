import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 5rem;
`;

export const Form = styled.form`
  width: 100%;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .button-container {
    margin-top: 1.5rem;

    button {
      width: 100%;
    }
  }
`;

export const Banner = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray[700]};
  background-image: url('https://source.unsplash.com/2wq0ReWAM8I');
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: overlay;
  border-radius: 0.5rem;
  width: 100%;
  height: 37.5rem;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  a {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray[500]};
    border-radius: 2rem;
    margin-top: 1.5rem;
    padding: 1rem 1.5rem;
    transition: all 0.2s ease-in;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      background: ${({ theme }) => theme.colors.primary[900]};
      color: ${({ theme }) => theme.colors.white};
      opacity: 1;
    }
  }
`;
