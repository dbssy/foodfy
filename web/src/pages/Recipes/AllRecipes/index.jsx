import { Container } from './styles';

import useAllRecipes from './useAllRecipes';

import Loader from '@/components/Loader';
import ErrorStatus from '@/components/ErrorStatus';
import EmptyList from '@/components/EmptyList';
import RecipesList from '@/components/RecipesList';

export default function Recipes() {
  const {
    recipes,
    isLoading,
    hasError,
    handleTryAgain,
  } = useAllRecipes();

  const hasRecipes = recipes.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasRecipes);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}

      {hasRecipes && <RecipesList recipes={recipes} />}
    </Container>
  );
}
