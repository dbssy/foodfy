import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UsersService from '@/services/UsersService';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useErrors from '@/hooks/useErrors';
import useSafeAsyncAction from '@/hooks/useSafeAsyncAction';

import isEmailValid from '@/utils/isEmailValid';
import toast from '@/utils/toast';

export default function useDetailsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, token } = useAuthenticatedUser();

  const { id } = useParams();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const safeAsyncAction = useSafeAsyncAction();
  const navigate = useNavigate();

  const isUserFormValid = (name && email && admin && errors.length === 0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const userData = await UsersService.getUserById(id, controller.signal);

        safeAsyncAction(() => {
          setName(userData.name);
          setEmail(userData.email);
          setAdmin(userData.admin);
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

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'O nome deve ser preenchido' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'O formato do e-mail é inválido.' });
    } else {
      removeError('email');
    }
  }

  function handleAdminChange(event) {
    setAdmin(event.target.value);

    if (!event.target.value) {
      setError({ field: 'admin', message: 'Informe se o usuário é ou não um administrador.' });
    } else {
      removeError('admin');
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      setIsSubmitting(true);

      await UsersService.updateUser(id, { name, email, admin }, token);

      toast({
        type: 'success',
        text: 'Informações atualizadas com sucesso!',
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
    name,
    email,
    admin,
    user,
    isUserFormValid,
    isSubmitting,
    getErrorMessageByFieldName,
    handleNameChange,
    handleEmailChange,
    handleAdminChange,
    handleSubmit,
  };
}
