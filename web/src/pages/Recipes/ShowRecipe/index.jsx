import {
  PaperPlaneTilt, Question, Timer, Users,
} from 'phosphor-react';
import { Link } from 'react-router-dom';

import { Container, RecipeBody, Section } from './styles';

import useShowRecipe from './useShowRecipe';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';

import Loader from '@/components/Loader';
import Modal from '@/components/Modal';

export default function ShowRecipe() {
  const {
    recipe,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    handleDeleteRecipe,
    handleCloseDeleteModal,
    handleConfirmDeleteRecipe,
  } = useShowRecipe();

  const { user, userId } = useAuthenticatedUser();

  const canEditOrDelete = userId === recipe.userId || user?.admin === true;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Section>
        <header>
          <div className="details">
            <div>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>

            {canEditOrDelete && (
              <>
                <Link to={`/recipes/edit/${recipe.id}`}>Editar receita</Link>

                <button
                  type="button"
                  onClick={handleDeleteRecipe}
                >
                  Deletar receita
                </button>

                <Modal
                  danger
                  visible={isDeleteModalVisible}
                  isLoading={isLoadingDelete}
                  title="Tem certeza que deseja excluir a receita?"
                  confirmLabel="Deletar"
                  onCancel={handleCloseDeleteModal}
                  onConfirm={handleConfirmDeleteRecipe}
                >
                  <p>Essa ação não poderá ser desfeita!</p>
                </Modal>
              </>
            )}
          </div>

          <img
            src={`http://localhost:3333/images/${recipe.imageUrl}`}
            alt={`${recipe.title}'s cover`}
          />

          <div className="informations">
            <div>
              <Question size={32} />
              <span>Dificuldade</span>
              <strong>{recipe.difficulty}</strong>
            </div>

            <div>
              <Timer size={32} />
              <span>Tempo de Preparo</span>
              <strong>{recipe.prepTime} minutos</strong>
            </div>

            <div>
              <Users size={32} />
              <span>Rendimento</span>
              <strong>{recipe.servings} porções</strong>
            </div>

            <div>
              <PaperPlaneTilt size={32} />
              <span>Enviado por</span>
              <strong>
                <Link to={`/users/show/${recipe.userId}`}>
                  {recipe.author}
                </Link>
              </strong>
            </div>
          </div>
        </header>

        <RecipeBody>
          <div>
            <div className="ingredients">
              <h3>Ingredientes</h3>

              {recipe?.ingredients?.map((ingredient) => (
                <div className="ingredient" key={ingredient}>
                  <label htmlFor={ingredient}>
                    <input type="checkbox" id={ingredient} />
                    <span>{ingredient}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="preparation">
              <h3>Modo de Preparo</h3>

              <ol>
                {recipe?.instructions?.map((instruction) => (
                  <li key={instruction}>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </RecipeBody>
      </Section>
    </Container>
  );
}
