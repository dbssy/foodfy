import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card, Container, FlexList } from './styles';

import Pagination from '@/components/Pagination';

import InputSearch from './InputSearch';
import SearchNotFound from './SearchNotFound';

export default function RecipesList({ recipes, pageSize = 8 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const currentRecipeData = recipes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredRecipes = useMemo(() => currentRecipeData.filter((recipe) => (
    recipe.title.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  )), [currentRecipeData, deferredSearchTerm]);

  const isSearchEmpty = recipes.length > 0 && filteredRecipes.length < 1;

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <InputSearch
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />

      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      <FlexList>
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id}>
            <Link to={`/recipes/show/${recipe.id}`}>
              <img src={`http://localhost:3333/images/${recipe.imageUrl}`} alt={recipe.title} />
            </Link>

            <div className="info">
              <h3>{recipe.title}</h3>
              <p>
                enviado por {' '}

                <Link to={`/users/show/${recipe.userId}`}>
                  {recipe.author}
                </Link>
              </p>
            </div>
          </Card>
        ))}
      </FlexList>

      <Pagination
        currentPage={currentPage}
        totalCount={recipes.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
}

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  })).isRequired,
  pageSize: PropTypes.number,
};
