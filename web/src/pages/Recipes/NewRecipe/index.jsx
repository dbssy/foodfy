import { Container } from './styles';

import useNewRecipe from './useNewRecipe';

import RecipeForm from '@/components/RecipeForm';

export default function NewRecipe() {
  const { recipeFormRef, handleSubmit } = useNewRecipe();

  return (
    <Container>
      <RecipeForm
        ref={recipeFormRef}
        headerLabel="Enviar receita"
        buttonLabel="Salvar"
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
