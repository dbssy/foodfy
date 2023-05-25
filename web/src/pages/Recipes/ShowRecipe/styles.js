import styled from 'styled-components';

export const Container = styled.main``;

export const Section = styled.section`
  header {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
    padding-bottom: 2rem;

    .details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;

      h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      p {
        color: ${({ theme }) => theme.colors.gray[500]};
        width: 70rem;
        line-height: 1.5;
      }

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

    img {
      border-radius: 0.25rem;
      width: 88rem;
      height: 20rem;
      object-fit: cover;
    }

    .informations {
      display: flex;
      justify-content: space-evenly;
      margin-top: 2rem;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.125rem;
        text-transform: uppercase;

        span {
          color: ${({ theme }) => theme.colors.gray[500]};
        }

        strong {
          a {
            color: ${({ theme }) => theme.colors.primary[500]};
            transition: 0.2s ease-in;

            &:hover {
              color: ${({ theme }) => theme.colors.primary[900]};
            }
          }
        }
      }
    }
  }
`;

export const RecipeBody = styled.article`
  > div {
    display: flex;
    margin-top: 2rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .ingredients {
      flex: 1;

      .ingredient {
        label {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          input[type=checkbox] {
            background: ${({ theme }) => theme.colors.white};
            border: 2px solid ${({ theme }) => theme.colors.primary[300]};
            border-radius: 50%;
            height: 1.5rem;
            width: 1.5rem;
            outline: none;
            appearance: none;
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease-in;

            &:checked {
              background-color: ${({ theme }) => theme.colors.primary[500]};
            }

            &:checked + span {
              text-decoration: line-through;
              opacity: 0.5;
            }

            &:before {
              content: '';
              border: solid ${({ theme }) => theme.colors.white};
              border-width: 0 2px 2px 0;
              width: 0.25rem;
              height: 0.625rem;
              margin: -1px -1px 0 -1px;
              top: 50%;
              right: 50%;
              z-index: 2;
              position: absolute;
              transform: rotate(45deg) translate(-50%, -50%);
            }
          }

          span {
            font-size: 1.25rem;
          }
        }
      }

      .ingredient + .ingredient {
        margin-top: 1rem;
      }
    }

    .preparation {
      flex: 1;

      ol {
        list-style: none;
        counter-reset: steps;

        li {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          counter-increment: steps;

          &::before {
            content: counter(steps);
            background: ${({ theme }) => theme.colors.primary[300]};
            color: ${({ theme }) => theme.colors.white};
            border-radius: 50%;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.5rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
`;
