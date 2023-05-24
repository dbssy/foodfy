import { SmileySad } from 'phosphor-react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import Button from '@/components/Button';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <SmileySad size={64} />

      <div className="details">
        <strong>
          Ocorreu um erro em nosso servidor <br />
          ao tentar obter os dados!
        </strong>

        <div>
          <Button onClick={onTryAgain}>Tentar novamente</Button>
        </div>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
