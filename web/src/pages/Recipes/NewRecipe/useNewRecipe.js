import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import RecipeServices from '@/services/RecipesService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';

import toast from '@/utils/toast';

export default function useNewRecipe() {
  const recipeFormRef = useRef(null);

  const { token } = useAuthenticatedUser();

  const navigate = useNavigate();

  async function handleSubmit(recipe) {
    try {
      const { id } = await RecipeServices.createRecipe(recipe, token);

      toast({
        type: 'success',
        text: 'Receita criada com sucesso!',
      });

      navigate(`/recipes/show/${id}`);
    } catch (error) {
      toast({
        type: 'danger',
        text: `${error.message}`,
      });
    }
  }

  return {
    recipeFormRef,
    handleSubmit,
  };
}
