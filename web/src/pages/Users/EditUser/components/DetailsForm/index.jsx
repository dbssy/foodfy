import { Container } from './styles';

import useDetailsForm from './useDetailsForm';

import Button from '@/components/Button';
import FormGroup from '@/components/FormGroup';
import Input from '@/components/Input';
import Select from '@/components/Select';

export default function DetailsForm() {
  const {
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
  } = useDetailsForm();

  return (
    <Container onSubmit={handleSubmit}>
      <header>
        <h2>Informações</h2>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!isUserFormValid}
        >
          Salvar alterações
        </Button>
      </header>

      <div>
        <FormGroup error={getErrorMessageByFieldName('name')}>
          <label htmlFor="name">Nome e sobrenome</label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={handleNameChange}
            error={getErrorMessageByFieldName('name')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('email')}>
          <label htmlFor="email">E-mail</label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@email.com"
            value={email}
            onChange={handleEmailChange}
            error={getErrorMessageByFieldName('email')}
            disabled={isSubmitting}
          />
        </FormGroup>

        {user?.admin === true && (
          <FormGroup error={getErrorMessageByFieldName('admin')}>
            <label htmlFor="admin">Usuário é administrador?</label>
            <Select
              value={admin}
              onChange={handleAdminChange}
              error={getErrorMessageByFieldName('admin')}
              disabled={isSubmitting}
            >
              <option value="">Selecione uma opção</option>

              <option value="true">Sim</option>
              <option value="false">Não</option>
            </Select>
          </FormGroup>
        )}
      </div>
    </Container>
  );
}
