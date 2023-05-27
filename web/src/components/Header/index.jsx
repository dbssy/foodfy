import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { List } from 'phosphor-react';

import { Container, DesktopNavbar, MobileNavbar } from './styles';

import logo from '@/assets/logo.svg';

import { AuthContext } from '@/contexts/AuthContext';

import Button from '@/components/Button';

import Dropdown from './Dropdown';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { authenticated, handleSignOut } = useContext(AuthContext);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <Container>
      <img src={logo} alt="Foodfy" />

      <MobileNavbar isOpen={isMobileMenuOpen}>
        <nav>
          <NavLink exact="true" to="/">Início</NavLink>
          <NavLink to="/about">Sobre nós</NavLink>
          <NavLink to="/recipes">Receitas</NavLink>
          <NavLink to="/users">Usuários</NavLink>
        </nav>

        <div className="actions">
          {!authenticated
            ? (
              <>
                <NavLink to="/signup">Cadastrar</NavLink>

                <NavLink to="/signin">
                  <Button>Entrar</Button>
                </NavLink>
              </>
            )
            : <Dropdown onSignOut={handleSignOut} />}
        </div>
      </MobileNavbar>

      <DesktopNavbar className="desktop-navbar">
        <nav>
          <NavLink exact="true" to="/">Início</NavLink>
          <NavLink to="/about">Sobre nós</NavLink>
          <NavLink to="/recipes">Receitas</NavLink>
          <NavLink to="/users">Usuários</NavLink>
        </nav>

        <div className="actions">
          {!authenticated
            ? (
              <>
                <NavLink to="/signup">Cadastrar</NavLink>

                <NavLink to="/signin">
                  <Button>Entrar</Button>
                </NavLink>
              </>
            )
            : <Dropdown onSignOut={handleSignOut} />}
        </div>
      </DesktopNavbar>

      <button
        type="button"
        className="mobile-navbar-button"
        onClick={toggleMobileMenu}
      >
        <List size={24} />
      </button>
    </Container>
  );
}
