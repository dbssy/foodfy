import { Link } from 'react-router-dom';

import { Banner, Container, Form } from './styles';

import useSignUp from './useSignUp';

import FormGroup from '@/components/FormGroup';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SignUp() {
  const {
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
  } = useSignUp();

  return (
    <Container>
      <Form noValidate onSubmit={handleSubmit}>
        <h2>Crie a sua conta</h2>

        <FormGroup error={getErrorMessageByFieldName('name')}>
          <label htmlFor="name">Nome e sobrenome *</label>
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
          <label htmlFor="email">O seu melhor e-mail *</label>
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

        <FormGroup error={getErrorMessageByFieldName('password')}>
          <label htmlFor="password">Sua senha *</label>
          <Input
            id="password"
            type="password"
            placeholder="Escolha uma senha segura e forte, de no mínimo 3 caracteres"
            value={password}
            onChange={handlePasswordChange}
            error={getErrorMessageByFieldName('password')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <div className="button-container">
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!isFormValid}
          >
            Cadastrar
          </Button>
        </div>
      </Form>

      <Banner>
        <h2>Bem vindo de volta</h2>
        <p>Faça login com os seus dados e descubra a próxima delícia que você irá cozinhar</p>

        <Link to="/signin">Entrar agora</Link>
      </Banner>
    </Container>
  );
}
