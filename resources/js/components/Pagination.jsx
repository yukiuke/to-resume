import { PER_PAGE_OPTIONS } from '../constants';

export default function Pagination({
  page,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="pagination">
      <div className="pagination__per-page">
        <label htmlFor="per-page">Per page</label>
        <select
          id="per-page"
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="pagination__select"
        >
          {PER_PAGE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="pagination__nav">
        <span className="pagination__range">
          {total === 0 ? '0' : `${start}–${end}`} of {total}
        </span>
        <button
          type="button"
          className="pagination__btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="pagination__btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
