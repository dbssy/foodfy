import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import UsersService from '@/services/UsersService';

import useSafeAsyncAction from '@/hooks/useSafeAsyncAction';

import toast from '@/utils/toast';

export default function useAuthenticatedUser() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const safeAsyncAction = useSafeAsyncAction();

  function isValidToken(tokenToCheck) {
    try {
      const { exp } = jwtDecode(tokenToCheck);

      if (exp < Date.now() / 1000) {
        return false;
      }

      return true;
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      toast({
        type: 'danger',
        text: 'Erro ao decodificar o token',
      });

      return false;
    }
  }

  useEffect(() => {
    function getDataFromLocalStorage() {
      const storedToken = JSON.parse(localStorage.getItem('token'));
      const storedUserId = JSON.parse(localStorage.getItem('userId'));

      if (storedToken && isValidToken(storedToken)) {
        setToken(storedToken);
        setUserId(storedUserId);
        setAuthenticated(true);
      }
    }

    getDataFromLocalStorage();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUserProfile() {
      try {
        const userData = await UsersService.getCurrentUser(token, controller.signal);

        safeAsyncAction(() => {
          setUser(userData);
          setIsLoading(false);
        });
      } catch (error) {
        toast({
          type: 'danger',
          text: `${error.message}`,
        });
      }
    }

    if (userId) {
      loadUserProfile();
    }

    return () => {
      controller.abort();
    };
  }, [safeAsyncAction, token, userId]);

  function removeDataFromLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    setUser(null);
    setAuthenticated(false);
  }

  return {
    token,
    userId,
    user,
    authenticated,
    isLoading,
    setAuthenticated,
    setIsLoading,
    removeDataFromLocalStorage,
  };
}
