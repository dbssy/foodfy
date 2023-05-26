import { useState } from 'react';
import { useParams } from 'react-router-dom';

import UsersService from '@/services/UsersService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useErrors from '@/hooks/useErrors';

import toast from '@/utils/toast';

export default function usePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { token } = useAuthenticatedUser();

  const { id } = useParams();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isPasswordFormValid = (
    currentPassword && newPassword && confirmPassword && errors.length === 0
  );

  function handleCurrentPasswordChange(event) {
    setCurrentPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'currentPassword', message: 'Informe a senha atual.' });
    } else {
      removeError('currentPassword');
    }
  }

  function handleNewPasswordChange(event) {
    setNewPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'newPassword', message: 'Uma senha deve ser fornecida, com no mínimo 3 caracteres.' });
    } else {
      removeError('newPassword');
    }
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'confirmPassword', message: 'A nova senha não corresponde com a confirmação de senha.' });
    } else {
      removeError('confirmPassword');
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      setIsSubmitting(true);

      await UsersService.updatePassword(
        id,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        token,
      );

      toast({
        type: 'success',
        text: 'A senha foi atualizadas com sucesso!',
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

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    isPasswordFormValid,
    isSubmitting,
    getErrorMessageByFieldName,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
}
