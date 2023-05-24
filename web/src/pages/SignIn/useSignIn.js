import { useContext, useState } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

import useErrors from '@/hooks/useErrors';

import toast from '@/utils/toast';
import isEmailValid from '@/utils/isEmailValid';

export default function useSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSignIn } = useContext(AuthContext);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (email && password && errors.length === 0);

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

      handleSignIn({ email, password });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao fazer login!',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    email,
    password,
    isSubmitting,
    isFormValid,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
