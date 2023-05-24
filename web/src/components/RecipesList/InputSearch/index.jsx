import PropTypes from 'prop-types';

import { Container } from './styles';

export default function InputSearch({ value, onChange }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Container onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Encontre uma receita..."
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
