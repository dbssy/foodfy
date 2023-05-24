import PropTypes from 'prop-types';

import { StyledSpinner } from './styles';

export default function Spinner({ size = 2 }) {
  return <StyledSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};
