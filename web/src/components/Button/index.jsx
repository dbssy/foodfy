import PropTypes from 'prop-types';

import { StyledButton } from './styles';

import Spinner from '@/components/Spinner';

export default function Button({
  type = 'button',
  danger = false,
  disabled = false,
  isLoading = false,
  onClick = undefined,
  children,
}) {
  return (
    <StyledButton
      type={type}
      danger={danger}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={1} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
