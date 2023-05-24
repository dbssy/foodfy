import { MagnifyingGlass } from 'phosphor-react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <MagnifyingGlass size={24} />

      <span>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong> 😞</span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
