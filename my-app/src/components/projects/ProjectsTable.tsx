// src/components/ProjectsTable.tsx
import { Project } from "../../types";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface Props {
    projects: Project[];
    loading: boolean;
    error: string | null;
    sortColumn: keyof Project;
    sortDirection: 'asc' | 'desc';
    handleSort: (column: keyof Project) => void;
    onRowDoubleClick: (projectId: number) => void; // Новый пропс для дабл-клика
}

// Функция для форматирования даты
const parseDate = (dateStr?: string | null): string => {
    if (!dateStr) return "—";
    try {
        return format(parseISO(dateStr), "dd.MM.yyyy HH:mm", { locale: ru });
    } catch (error) {
        console.error("Ошибка парсинга даты", error);
        return "—";
    }
};

// Функция сортировки проектов
const sortProjects = (projects: Project[], sortColumn: keyof Project, sortDirection: 'asc' | 'desc') => {
    return [...projects].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue === bValue) return 0;

        // Сортировка строк
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        // Сортировка дат
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            const aDate = Date.parse(aValue);
            const bDate = Date.parse(bValue);

            if (!isNaN(aDate) && !isNaN(bDate)) {
                return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
            }
        }

        return 0;
    });
};

export function ProjectsTable({ projects, loading, error, sortColumn, sortDirection, handleSort, onRowDoubleClick }: Props) {
    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p>{error}</p>;

    // Применяем сортировку
    const sortedProjects = sortProjects(projects, sortColumn, sortDirection);

    return (
        <table className="projects-list">
            <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>
                        ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('customer')}>
                        Заказчик {sortColumn === 'customer' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('patient')}>
                        Пациент {sortColumn === 'patient' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('dateCreate')}>
                        Дата создания {sortColumn === 'dateCreate' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('status')}>
                        Статус {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('dateCompleted')}>
                        Дата завершения {sortColumn === 'dateCompleted' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedProjects.map((project) => (
                    <tr key={project.id} onDoubleClick={() => onRowDoubleClick(project.id)} style={{ cursor: "pointer" }}>
                        <td>{project.id}</td>
                        <td>{project.customer}</td>
                        <td>{project.patient}</td>
                        <td>{parseDate(project.dateCreate ?? undefined)}</td>
                        <td>{project.status}</td>
                        <td>{parseDate(project.dateCompleted ?? undefined)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
