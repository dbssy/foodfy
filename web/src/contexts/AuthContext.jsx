import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthServices from '@/services/AuthService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useSafeAsyncAction from '@/hooks/useSafeAsyncAction';

import toast from '@/utils/toast';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { authenticated, setAuthenticated } = useAuthenticatedUser();

  const navigate = useNavigate();

  const safeAsyncAction = useSafeAsyncAction();

  const authContextValue = useMemo(() => ({
    handleSignUp: async (data) => {
      try {
        const { user, token } = await AuthServices.signUp(data);

        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('userId', JSON.stringify(user.id));

        safeAsyncAction(() => {
          setAuthenticated(true);

          navigate('/');

          toast({
            type: 'success',
            text: 'Seja bem-vindo(a) ao Foodfy!',
          });
        });
      } catch (error) {
        toast({
          type: 'danger',
          text: `${error.message}`,
        });
      }
    },

    handleSignIn: async (data) => {
      try {
        const { user, token } = await AuthServices.signIn(data);

        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('userId', JSON.stringify(user.id));

        safeAsyncAction(() => {
          setAuthenticated(true);

          navigate('/');

          toast({
            type: 'default',
            text: 'Seja bem vindo(a) de volta!',
          });
        });
      } catch (error) {
        toast({
          type: 'danger',
          text: `${error.message}`,
        });
      }
    },

    handleSignOut: async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));

        await AuthServices.signOut(token);

        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        safeAsyncAction(() => {
          setAuthenticated(false);

          navigate('/');

          toast({
            type: 'success',
            text: 'Você deslogou com sucesso, volte sempre!',
          });
        });
      } catch (error) {
        toast({
          type: 'danger',
          text: `${error.message}`,
        });
      }
    },

    authenticated,
    setAuthenticated,
  }), [authenticated, safeAsyncAction, setAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
