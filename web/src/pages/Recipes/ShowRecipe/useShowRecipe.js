import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RecipesService from '@/services/RecipesService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useSafeAsyncAction from '@/hooks/useSafeAsyncAction';

import toast from '@/utils/toast';

export default function useShowRecipe() {
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { token } = useAuthenticatedUser();

  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipe() {
      try {
        const data = await RecipesService.getRecipeById(id, controller.signal);

        safeAsyncAction(() => {
          setIsLoading(false);
          setRecipe(data);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          navigate('/recipes');

          toast({
            type: 'danger',
            text: 'Receita não encontrada!',
          });
        });
      }
    }

    loadRecipe();

    return () => {
      controller.abort();
    };
  }, [id, navigate, safeAsyncAction]);

  function handleDeleteRecipe() {
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteRecipe() {
    try {
      setIsLoadingDelete(true);

      await RecipesService.deleteRecipe(id, token);

      navigate('/');

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'A receita foi deletada com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar a receita!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    recipe,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    handleDeleteRecipe,
    handleCloseDeleteModal,
    handleConfirmDeleteRecipe,
  };
}
