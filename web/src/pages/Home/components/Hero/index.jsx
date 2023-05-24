import { Link } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';

import { Container } from './styles';

export default function Hero() {
  return (
    <Container>
      <div>
        <h1>Escolha entre milhares <br /> de receitas</h1>
        <p>
          Saboreie uma receita inesquecível, que <br />
          despertarão memórias gustativas únicas.
        </p>

        <Link to="/recipes">Explorar <ArrowRight size={24} /></Link>
      </div>
    </Container>
  );
}
