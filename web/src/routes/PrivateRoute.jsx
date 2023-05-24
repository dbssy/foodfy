import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from '@/contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? { children } : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
