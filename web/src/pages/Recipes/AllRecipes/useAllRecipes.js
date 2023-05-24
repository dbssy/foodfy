import { useCallback, useEffect, useState } from 'react';

import RecipesService from '@/services/RecipesService';

export default function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadRecipes = useCallback(async (signal) => {
    try {
      setIsLoading(true);

      const recipesList = await RecipesService.listRecipes(signal);

      setHasError(false);
      setRecipes(recipesList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadRecipes(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadRecipes]);

  function handleTryAgain() {
    loadRecipes();
  }

  return {
    recipes,
    isLoading,
    hasError,
    handleTryAgain,
  };
}
