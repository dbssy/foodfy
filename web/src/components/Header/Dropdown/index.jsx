import { Link } from 'react-router-dom';
import { UserCircle } from 'phosphor-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import PropTypes from 'prop-types';

import { Content, Item } from './styles';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';

export default function Dropdown({ onSignOut }) {
  const { user } = useAuthenticatedUser();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="dropdown-button">
          <UserCircle size={40} weight="light" />

          Olá, {user?.name}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <Content sideOffset={5}>
          <Item>
            <Link to="/profile/me">Meu perfil</Link>
          </Item>

          <Item>
            <Link to="/recipes/new">Enviar uma receita</Link>
          </Item>

          <DropdownMenu.Separator className="separator" />

          <Item>
            <Link
              to="/"
              className="signout"
              onClick={onSignOut}
            >
              Sair
            </Link>
          </Item>

          <DropdownMenu.Arrow className="arrow" />
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

Dropdown.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};
