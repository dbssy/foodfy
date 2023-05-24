import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Content = styled(DropdownMenu.Content)`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 0.25rem;
  width: 12rem;
  padding: 1rem 0;

  .separator {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    height: 1px;
    margin: 1rem 0;
  }

  .arrow {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export const Item = styled(DropdownMenu.Item)`
  padding: 0 1rem;
  outline: none;

  .signout {
    color: ${({ theme }) => theme.colors.danger[500]};
    font-weight: 500;

    &:hover {
      color: ${({ theme }) => theme.colors.danger[300]};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.gray[500]};
    transition: all 0.2s ease-in;
  }

  & + & {
    margin-top: 0.75rem;
  }
`;
