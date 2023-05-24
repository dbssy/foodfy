import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 1.5rem;
  }

  .form-item {
    position: relative;

    label {
      color: ${({ theme }) => theme.colors.gray[500]};
      margin-bottom: 0.5rem;
      display: block;
    }

    .loader {
      right: 1rem;
      top: 1.125rem;
      position: absolute;
    }
  }

  small {
    color: ${({ theme }) => theme.colors.danger[500]};
    font-size: 0.75rem;
    margin-top: 0.5rem;
    display: block;
  }
`;
