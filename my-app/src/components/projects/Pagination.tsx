
interface Props {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export function Pagination({ page, totalPages, setPage }: Props) {
    return (
        <div className="pagination">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="pagination-button back"
            >
                Назад
            </button>
            <span className="page-info">Страница {page} из {totalPages}</span>
            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="pagination-button forward"
            >
                Вперед
            </button>
        </div>
    );
}
