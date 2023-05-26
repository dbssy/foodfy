import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UsersService from '@/services/UsersService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useSafeAsyncAction from '@/hooks/useSafeAsyncAction';

import toast from '@/utils/toast';

export default function useAvatarForm() {
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { token, isLoading } = useAuthenticatedUser();

  const { id } = useParams();

  const safeAsyncAction = useSafeAsyncAction();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const userData = await UsersService.getUserById(id, controller.signal);

        safeAsyncAction(() => {
          setAvatar(userData.avatarUrl);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          navigate('/');

          toast({
            type: 'danger',
            text: 'Usuário não encontrado!',
          });
        });
      }
    }

    loadUser();

    return () => {
      controller.abort();
    };
  }, [id, navigate, safeAsyncAction]);

  function handleAvatarChange(event) {
    setFile(event.target.files[0]);
  }

  function handleDeleteAvatar() {
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('avatar_url', file);

      const { avatar_url } = await UsersService.updateAvatar(id, formData, token);

      setAvatar(avatar_url);

      toast({
        type: 'success',
        text: 'Avatar atualizado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: `${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDeleteAvatar() {
    try {
      setIsLoadingDelete(true);

      const { avatar_url } = await UsersService.deleteAvatar(id, token);

      setAvatar(avatar_url);

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Avatar deletado com sucesso!',
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
    avatar,
    isLoading,
    isSubmitting,
    isLoadingDelete,
    isDeleteModalVisible,
    handleAvatarChange,
    handleDeleteAvatar,
    handleCloseDeleteModal,
    handleSubmit,
    handleConfirmDeleteAvatar,
  };
}
