export interface TypeService {
    id: number;
    name: string;
}

interface Props {
    prostheses: TypeService[];
    loading: boolean;
    error: boolean;
    onRowClick: (p: TypeService) => void;
  }
  
  export function ProsthesesTable({ prostheses, loading, error, onRowClick }: Props) {
    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка загрузки данных</p>;
    if (!prostheses.length) return <p>Нет данных</p>;
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Название</th>
          </tr>
        </thead>
        <tbody>
          {prostheses.map((p) => (
            <tr key={p.id} onClick={() => onRowClick(p)}>
              <td>{p.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
