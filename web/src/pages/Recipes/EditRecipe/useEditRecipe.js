import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RecipesService from '@/services/RecipesService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useSafeAsyncAction from '@/hooks/useSafeAsyncAction';

import toast from '@/utils/toast';

export default function useEditRecipe() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipeTitle, setRecipeTitle] = useState('');

  const recipeFormRef = useRef(null);

  const { id } = useParams();
  const { token } = useAuthenticatedUser();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipe() {
      try {
        const recipe = await RecipesService.getRecipeById(id, controller.signal);

        safeAsyncAction(() => {
          recipeFormRef.current.setFieldsValues(recipe);

          setIsLoading(false);
          setRecipeTitle(recipe.title);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          navigate('/');

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

  async function handleSubmit(recipe) {
    try {
      const recipeData = await RecipesService.updateRecipe(id, recipe, token);

      setRecipeTitle(recipeData.title);

      navigate(`/recipes/show/${id}`);

      toast({
        type: 'success',
        text: 'Receita editada com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: `${error.message}`,
      });
    }
  }

  return {
    isLoading,
    recipeTitle,
    recipeFormRef,
    handleSubmit,
  };
}
