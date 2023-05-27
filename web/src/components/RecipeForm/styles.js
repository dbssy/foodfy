import styled from 'styled-components';

export const Form = styled.form`
  width: 50%;
  margin: 2rem auto;

  header {
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  @media screen and (max-width: 769px) {
    width: 80%;

    header {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .recipe-image {
    width: 100%;

    img {
      width: 100%;
      height: 20rem;
      border-radius: 0.25rem;
      margin-bottom: 2rem;
      object-fit: cover;
    }

    label {
      & {
        color: ${({ theme }) => theme.colors.primary[500]};
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
        border: 2px dashed ${({ theme }) => theme.colors.primary[500]};
        border-radius: 0.25rem;
        height: 3rem;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease-in;
      }

      &:hover {
        background: ${({ theme }) => theme.colors.primary[300]};
        color: ${({ theme }) => theme.colors.white};
        border: 2px dashed ${({ theme }) => theme.colors.primary[300]};
      }

      &:active {
        background: ${({ theme }) => theme.colors.primary[900]};
        color: ${({ theme }) => theme.colors.white};
        border: 2px dashed ${({ theme }) => theme.colors.primary[900]};
      }

      &[disabled] {
        background: ${({ theme }) => theme.colors.gray[200]} !important;
        border: 2px dashed ${({ theme }) => theme.colors.gray[200]};
        cursor: not-allowed;
      }

      input {
        position: absolute;
        top: -1000px;
      }
    }

    p {
      color: ${({ theme }) => theme.colors.gray[500]};
      font-size: 0.875rem;
      margin-top: 1rem;
    }
  }

  .recipe-info {
    border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
    width: 100%;
    margin-top: 1rem;
    padding: 2rem 0;

    .three-columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      place-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .two-columns {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-content: center;
      gap: 1rem;
      margin-top: 1.5rem;

      label {
        cursor: inherit;
      }

      button {
        &.add {
          font-weight: 500;
          margin-top: 1rem;

          &:hover {
            color: ${({ theme }) => theme.colors.primary[500]};
            transition: color 0.2s ease-in;
          }
        }

        &.remove {
          color: ${({ theme }) => theme.colors.gray[500]};
          margin: 1rem 0;
        }
      }
    }

    @media screen and (max-width: 895px) {
      .three-columns,
      .two-columns {
        display: flex;
        flex-direction: column;
      }

      .ingredients,
      .instructions {
        border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
        margin-top: 2rem;
        padding-top: 2rem;

        label {
          font-weight: bold;
        }
      }
    }
  }
`;
