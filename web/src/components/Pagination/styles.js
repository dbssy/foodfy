import styled, { css } from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  margin: 3rem 0;
`;

export const PaginationItem = styled.li`
  color: rgba(0, 0, 0, 0.87);
  border-radius: 1rem;
  min-width: 2rem;
  height: 2rem;
  margin: auto 0.25rem;
  padding: 0 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.01071em;
  display: flex;
  align-items: center;

  .arrow {
    &::before {
      content: '';
      border-top: 0.12em solid rgba(0, 0, 0, 0.87);
      border-right: 0.12em solid rgba(0, 0, 0, 0.87);
      width: 0.4em;
      height: 0.4em;
      position: relative;
      display: inline-block;
    }

    &.left {
      transform: rotate(-135deg) translate(-50%);
    }

    &.right {
      transform: rotate(45deg);
    }
  }

  &.dots:hover {
    background-color: transparent;
    cursor: default;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }

  ${({ selected }) => selected && css`
    background-color: ${({ theme }) => theme.colors.primary[300]} !important;
    color: ${({ theme }) => theme.colors.white};
  `}

  ${({ disabled }) => disabled && css`
    pointer-events: none;

    .arrow::before {
      border-right: 0.12em solid rgba(0, 0, 0, 0.43);
      border-top: 0.12em solid rgba(0, 0, 0, 0.43);
    }

    &:hover {
      background-color: transparent;
      cursor: default;
    }
  `}
`;
