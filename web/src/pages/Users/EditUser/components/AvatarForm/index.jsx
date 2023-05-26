import { Avatar, Container } from './styles';

import useAvatarForm from './useAvatarForm';

import Loader from '@/components/Loader';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

export default function AvatarForm() {
  const {
    avatar,
    isLoading,
    isSubmitting,
    isLoadingDelete,
    isDeleteModalVisible,
    handleAvatarChange,
    handleDeleteAvatar,
    handleSubmit,
    handleCloseDeleteModal,
    handleConfirmDeleteAvatar,
  } = useAvatarForm();

  if (!avatar) {
    return (
      <>
        <Loader isLoading={isLoading} />
        <div>Carregando...</div>
      </>
    );
  }

  return (
    <Container
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <header>
        <h2>Avatar</h2>

        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Salvar avatar
        </Button>
      </header>

      <Avatar>
        <img
          src={`http://localhost:3333/images/${avatar}`}
          alt="Avatar"
        />

        <div className="buttons-container">
          <label htmlFor="avatar">
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={isSubmitting}
            />
            <span>Enviar um avatar</span>
          </label>

          <button
            type="button"
            className="outline"
            onClick={handleDeleteAvatar}
          >
            Deletar
          </button>

          <Modal
            danger
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
            title="Tem certeza que deseja remover o avatar?"
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteAvatar}
          >
            <p>Essa ação não poderá ser desfeita!</p>
          </Modal>
        </div>
      </Avatar>
    </Container>
  );
}
