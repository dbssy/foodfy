import styled from 'styled-components';

export const Container = styled.form`
  width: 50%;
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .buttons-container {
    display: flex;
    gap: 0.5rem;

    label {
      & {
        background-color: ${({ theme }) => theme.colors.primary[500]};
        color: ${({ theme }) => theme.colors.white};
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
        border: none;
        border-radius: 0.25rem;
        height: 3rem;
        padding: 0 2rem;
        font-size: 0.875rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease-in;
      }

      &:hover {
        background: ${({ theme }) => theme.colors.primary[300]};
      }

      &:active {
        background: ${({ theme }) => theme.colors.primary[900]};
      }

      &[disabled] {
        background: ${({ theme }) => theme.colors.gray[200]} !important;
        cursor: not-allowed;
      }

      input {
        position: absolute;
        top: -1000px;
      }
    }

    .outline {
      background: none;
      color: ${({ theme }) => theme.colors.danger[500]};
      border: 2px solid ${({ theme }) => theme.colors.danger[500]};
      border-radius: 0.25rem;
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
  }
`;
