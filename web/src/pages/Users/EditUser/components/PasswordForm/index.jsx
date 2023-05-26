import { Container } from './styles';

import usePasswordForm from './usePasswordForm';

import Button from '@/components/Button';
import FormGroup from '@/components/FormGroup';
import Input from '@/components/Input';

export default function PasswordForm() {
  const {
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
  } = usePasswordForm();

  return (
    <Container onSubmit={handleSubmit}>
      <header>
        <h2>Atualizar Senha</h2>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!isPasswordFormValid}
        >
          Mudar a senha
        </Button>
      </header>

      <FormGroup error={getErrorMessageByFieldName('currentPassword')}>
        <label htmlFor="currentPassword">Atual senha</label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Insira a sua atual senha"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          error={getErrorMessageByFieldName('currentPassword')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('newPassword')}>
        <label htmlFor="newPassword">Nova senha</label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Insira a sua nova senha"
          value={newPassword}
          onChange={handleNewPasswordChange}
          error={getErrorMessageByFieldName('newPassword')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('confirmPassword')}>
        <label htmlFor="confirmPassword">Confirmar nova senha</label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Repita a sua nova senha"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={getErrorMessageByFieldName('confirmPassword')}
          disabled={isSubmitting}
        />
      </FormGroup>
    </Container>
  );
}
