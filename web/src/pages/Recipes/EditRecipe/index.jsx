import { Container } from './styles';

import useEditRecipe from './useEditRecipe';

import Loader from '@/components/Loader';
import RecipeForm from '@/components/RecipeForm';

export default function EditRecipe() {
  const {
    isLoading,
    recipeTitle,
    recipeFormRef,
    handleSubmit,
  } = useEditRecipe();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <RecipeForm
        ref={recipeFormRef}
        headerLabel={isLoading ? 'Carregando...' : `Editar "${recipeTitle}"`}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
