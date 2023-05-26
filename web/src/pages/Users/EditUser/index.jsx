import { SignOut } from 'phosphor-react';
import { Link } from 'react-router-dom';

import { Actions, Container, Section } from './styles';

import useEditUser from './useEditUser';

import Modal from '@/components/Modal';

import AvatarForm from './components/AvatarForm';
import DetailsForm from './components/DetailsForm';
import PasswordForm from './components/PasswordForm';

export default function EditUser() {
  const {
    userId,
    id,
    isLoadingDelete,
    isDeleteModalVisible,
    handleDeleteAccount,
    handleCloseDeleteModal,
    handleConfirmDeleteAccount,
    handleSignOut,
  } = useEditUser();

  const isUserIdEqualId = userId === id;
  const buttonSize = isUserIdEqualId ? '' : '100';

  return (
    <Container>
      <Section>
        <AvatarForm />

        <DetailsForm />

        <PasswordForm />

        <Actions buttonSize={buttonSize}>
          {isUserIdEqualId && (
            <Link to="/" onClick={handleSignOut}>
              <SignOut size={24} />
              Deslogar
            </Link>
          )}

          <button
            type="button"
            className="outline"
            onClick={handleDeleteAccount}
          >
            Deletar conta
          </button>

          <Modal
            danger
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
            title="Tem certeza que deseja excluir a conta?"
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteAccount}
          >
            <p>Essa ação não poderá ser desfeita!</p>
          </Modal>
        </Actions>
      </Section>
    </Container>
  );
}
