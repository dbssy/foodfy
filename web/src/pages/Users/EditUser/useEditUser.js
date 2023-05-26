import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@/contexts/AuthContext';

import UsersService from '@/services/UsersService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';

import toast from '@/utils/toast';

export default function useProfile() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { setAuthenticated, handleSignOut } = useContext(AuthContext);

  const { userId, token, removeDataFromLocalStorage } = useAuthenticatedUser();

  const { id } = useParams();
  const navigate = useNavigate();

  function handleDeleteAccount() {
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteAccount() {
    try {
      setIsLoadingDelete(true);

      await UsersService.deleteUser(id, token);

      navigate('/');

      setAuthenticated(false);

      removeDataFromLocalStorage();

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'A conta foi deletada com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: `${error.message}`,
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    userId,
    id,
    isLoadingDelete,
    isDeleteModalVisible,
    handleDeleteAccount,
    handleCloseDeleteModal,
    handleConfirmDeleteAccount,
    handleSignOut,
  };
}
