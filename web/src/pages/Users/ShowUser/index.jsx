import { Link } from 'react-router-dom';

import { Container, Section } from './styles';

import useShowUser from './useShowUser';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';

import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import RecipesList from '@/components/RecipesList';

export default function ShowUser() {
  const {
    userData,
    recipes,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    handleDeleteUser,
    handleCloseDeleteModal,
    handleConfirmDeleteUser,
  } = useShowUser();

  const { user } = useAuthenticatedUser();

  const canEditOrDelete = user?.admin === true;
  const hasRecipes = recipes.length > 0;

  if (!userData) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Section>
        <header>
          <h2>Perfil de <span>{userData.name}</span></h2>

          <div>
            {canEditOrDelete && (
              <>
                <Link to={`/users/edit/${userData.id}`}>Editar</Link>

                <button
                  type="button"
                  onClick={handleDeleteUser}
                >
                  Deletar
                </button>

                <Modal
                  danger
                  visible={isDeleteModalVisible}
                  isLoading={isLoadingDelete}
                  title="Tem certeza que deseja excluir o usuário?"
                  confirmLabel="Deletar"
                  onCancel={handleCloseDeleteModal}
                  onConfirm={handleConfirmDeleteUser}
                >
                  <p>Essa ação não poderá ser desfeita!</p>
                </Modal>
              </>
            )}
          </div>
        </header>

        <div className="details">
          <img
            src={`http://localhost:3333/images/${userData.avatarUrl}`}
            alt={`${userData.name}'s Avatar`}
          />

          {userData.totalRecipes > 0 && (
            <p>
              {userData.totalRecipes > 1
                ? `${userData.totalRecipes} receitas`
                : `${userData.totalRecipes} receita`}
            </p>
          )}
        </div>
      </Section>

      {hasRecipes && <RecipesList recipes={recipes} />}
    </Container>
  );
}
