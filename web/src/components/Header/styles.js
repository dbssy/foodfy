import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  padding: 2rem 0;

  img {
    width: 7rem;
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

  .mobile-navbar-button {
    display: none;

    @media screen and (max-width: 769px) {
      display: block;
      margin-left: auto;
    }
  }
`;

export const DesktopNavbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  nav {
    margin-left: 3rem;
  }

  a + a {
    margin-left: 2rem;
  }

  .actions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  @media screen and (max-width: 769px) {
    display: none;
  }
`;

export const MobileNavbar = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 100vw;
  height: 100vh;
  top: 10vh;
  right: 0;
  z-index: 1;
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;

  nav,
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
  }

  a + a,
  .actions {
    margin-top: 2rem;
  }
`;
