import { useCallback, useEffect, useState } from 'react';

import UsersService from '@/services/UsersService';

export default function useAllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadUsers = useCallback(async (signal) => {
    try {
      setIsLoading(true);

      const usersList = await UsersService.listUsers(signal);

      setHasError(false);
      setUsers(usersList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadUsers(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadUsers]);

  function handleTryAgain() {
    loadUsers();
  }

  return {
    users,
    isLoading,
    hasError,
    handleTryAgain,
  };
}
