import { SmileyXEyes } from 'phosphor-react';

import { Container } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <SmileyXEyes size={64} />

      <p>
        Ops.. Parece que ninguém cadastrou nenhuma receita ainda, acredita nisso? <br />
        Que tal compartilhar conosco a sua receita?
        Clique no botão <strong>“Entrar”</strong> à cima <br />
        para entrar e cadastrar a sua primeira receita!
      </p>
    </Container>
  );
}
