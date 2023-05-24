import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  padding: 2rem 0;

  img {
    width: 7rem;
  }

  nav {
    margin-left: 3rem;
  }

  a,
  .dropdown-button {
    color: ${({ theme }) => theme.colors.gray[500]};
    font-weight: 500;
    transition: all 0.2s ease-in;

    &.active,
    &:hover {
      color: ${({ theme }) => theme.colors.primary[500]};
    }
  }

  a + a {
    margin-left: 2rem;
  }

  .actions {
    display: flex;
    align-items: center;
    margin-left: auto;

    .dropdown-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      &[data-state="open"] {
        color: ${({ theme }) => theme.colors.primary[500]};
        transition: color 0.2s ease-in;
      }
    }
  }
`;
