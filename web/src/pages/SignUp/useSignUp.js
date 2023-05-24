import { useContext, useState } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

import useErrors from '@/hooks/useErrors';

import isEmailValid from '@/utils/isEmailValid';
import toast from '@/utils/toast';

export default function useSignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSignUp } = useContext(AuthContext);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && email && password && errors.length === 0);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'O seu nome deve ser preenchido' });
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

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Uma senha deve ser fornecida, com no mínimo 3 caracteres.' });
    } else {
      removeError('password');
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      setIsSubmitting(true);

      handleSignUp({ name, email, password });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar a sua conta!',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    name,
    email,
    password,
    isSubmitting,
    isFormValid,
    getErrorMessageByFieldName,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
