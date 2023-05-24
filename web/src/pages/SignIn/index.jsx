import { Link } from 'react-router-dom';

import { Banner, Container, Form } from './styles';

import useSignIn from './useSignIn';

import FormGroup from '@/components/FormGroup';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SignUp() {
  const {
    email,
    password,
    isSubmitting,
    isFormValid,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useSignIn();

  return (
    <Container>
      <Form noValidate onSubmit={handleSubmit}>
        <h2>Entre com a sua conta</h2>

        <FormGroup error={getErrorMessageByFieldName('email')}>
          <label htmlFor="email">E-mail *</label>
          <Input
            id="email"
            type="email"
            placeholder="O e-mail que você cadastrou"
            value={email}
            onChange={handleEmailChange}
            error={getErrorMessageByFieldName('email')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('password')}>
          <label htmlFor="password">Senha *</label>
          <Input
            id="password"
            type="password"
            placeholder="Insira a sua senha segura"
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
            Entrar agora
          </Button>
        </div>
      </Form>

      <Banner>
        <h2>Não possui uma conta ainda?</h2>
        <p>Crie uma conta, de graça, e conheça milhares de receitas</p>

        <Link to="/signup">Cadastre-se</Link>
      </Banner>
    </Container>
  );
}
