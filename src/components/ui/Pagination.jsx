export function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination" aria-label="Paginacion">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Anterior
      </button>
      <div className="pagination-pages">
        {pages.map((currentPage) => (
          <button
            type="button"
            key={currentPage}
            className={currentPage === page ? "is-active" : ""}
            onClick={() => onPageChange(currentPage)}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {currentPage}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}

