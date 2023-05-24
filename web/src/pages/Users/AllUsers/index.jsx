import { Container } from './styles';

import useAllUsers from './useAllUsers';

import Loader from '@/components/Loader';
import ErrorStatus from '@/components/ErrorStatus';
import EmptyList from '@/components/EmptyList';

import UsersList from './components/UsersList';

export default function Users() {
  const {
    users,
    isLoading,
    hasError,
    handleTryAgain,
  } = useAllUsers();

  const hasUsers = users.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasUsers);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}

      {hasUsers && <UsersList users={users} />}
    </Container>
  );
}
