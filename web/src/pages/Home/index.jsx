import { Container } from './styles';

import useHome from './useHome';

import Loader from '@/components/Loader';
import ErrorStatus from '@/components/ErrorStatus';
import EmptyList from '@/components/EmptyList';
import RecipesList from '@/components/RecipesList';

import Hero from './components/Hero';

export default function Home() {
  const {
    recipes,
    isLoading,
    hasError,
    handleTryAgain,
  } = useHome();

  const hasRecipes = recipes.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasRecipes);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Hero />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}

      {hasRecipes && <RecipesList recipes={recipes} />}
    </Container>
  );
}
