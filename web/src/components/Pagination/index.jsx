import PropTypes from 'prop-types';

import { Container, PaginationItem } from './styles';

import usePagination, { DOTS } from '@/hooks/usePagination';

export default function Pagination({
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  onPageChange,
}) {
  const paginationRange = usePagination({
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
  });

  let lastPage = paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  function onNext() {
    onPageChange(currentPage + 1);
  }

  function onPrevious() {
    onPageChange(currentPage - 1);
  }

  return (
    <Container>
      <PaginationItem
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </PaginationItem>

      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <PaginationItem className="dots">&#8230;</PaginationItem>;
        }

        return (
          <PaginationItem
            key={pageNumber}
            selected={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PaginationItem>
        );
      })}

      <PaginationItem
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <div className="arrow right" />
      </PaginationItem>
    </Container>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
