import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card, Container, FlexList } from './styles';

import Pagination from '@/components/Pagination';

export default function UsersList({ users }) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  const currentUsersData = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Container>
      <FlexList>
        {currentUsersData.map((user) => (
          <Card key={user.id}>
            <Link to={`/users/show/${user.id}`}>
              <img
                src={`http://localhost:3333/images/${user.avatarUrl}`}
                alt={`${user.name}'s avatar`}
              />

              <h4>{user.name}</h4>

              {user.totalRecipes > 0 && (
                <p>
                  {user.totalRecipes > 1
                    ? `${user.totalRecipes} receitas`
                    : `${user.totalRecipes} receita`}
                </p>
              )}
            </Link>
          </Card>
        ))}
      </FlexList>

      <Pagination
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    totalRecipes: PropTypes.string,
  })).isRequired,
};
