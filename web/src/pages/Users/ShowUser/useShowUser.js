import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UsersService from '@/services/UsersService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useSafeAsyncAction from '@/hooks/useSafeAsyncAction';

import toast from '@/utils/toast';

export default function useShowUser() {
  const [userData, setUserData] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { token } = useAuthenticatedUser();

  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const data = await UsersService.getUserById(id, controller.signal);

        safeAsyncAction(() => {
          setIsLoading(false);
          setUserData(data);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          navigate('/users');

          toast({
            type: 'danger',
            text: 'Usuário não encontrado!',
          });
        });
      }
    }

    async function loadUserRecipes() {
      try {
        setIsLoading(true);

        const recipesList = await UsersService.getUserRecipesById(id, controller.signal);

        safeAsyncAction(() => {
          setIsLoading(false);
          setRecipes(recipesList);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        toast({
          type: 'danger',
          text: 'Receitas não encontradas!',
        });
      }
    }

    loadUser();
    loadUserRecipes();

    return () => {
      controller.abort();
    };
  }, [id, navigate, safeAsyncAction]);

  function handleDeleteUser() {
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteUser() {
    try {
      setIsLoadingDelete(true);

      await UsersService.deleteUser(id, token);

      navigate('/');

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'O usuário foi deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o usuário!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    userData,
    recipes,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    handleDeleteUser,
    handleCloseDeleteModal,
    handleConfirmDeleteUser,
  };
}
