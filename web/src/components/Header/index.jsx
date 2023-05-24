import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from './styles';

import logo from '@/assets/logo.svg';

import { AuthContext } from '@/context/AuthContext';

import Button from '@/components/Button';

import Dropdown from './Dropdown';

export default function Header() {
  const { authenticated, handleSignOut } = useContext(AuthContext);

  return (
    <Container>
      <img src={logo} alt="Foodfy" />

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
    </Container>
  );
}
