import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { useSearchProjects } from "../hooks/useSearchProjects";
import { ProjectsTable } from "../components/projects/ProjectsTable";
import { Pagination } from "../components/projects/Pagination";
import { Sidebar } from "../components/projects/Sidebar"; 
import { Project } from "../types";
import "../styles/Projects.css";

export function Projects() {
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState<keyof Project>('dateCreate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["customer", "patient"]); // Фильтры поиска

    const navigate = useNavigate();

    const { projects, loading, error, totalPages } = useProjects(page);
    const { searchResults, loading: searchLoading, error: searchError } = useSearchProjects(searchQuery, selectedFilters);

    const handleSort = (column: keyof Project) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const handleRowDoubleClick = (projectId: number) => {
        navigate(`/create?id=${projectId}`);
    };

    // Используем результаты поиска, если есть запрос, иначе обычный список
    const displayedProjects = searchQuery ? searchResults : projects;
    const isLoading = searchQuery ? searchLoading : loading;
    const isError = searchQuery ? searchError : error;

    return (
        <div className="content-wrapper">
            <Sidebar 
                onSearch={(query, filters) => {
                    setSearchQuery(query);
                    setSelectedFilters(filters);
                }} 
            />
            <main className="main-content">
                <div className="button-container">
                    <button className="create-button" onClick={() => navigate("/create")}>
                        Создать
                    </button>
                </div>
                <div className="projects-table">
                    <ProjectsTable
                        projects={displayedProjects}
                        loading={isLoading}
                        error={isError}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                        onRowDoubleClick={handleRowDoubleClick}
                    />
                </div>
                {!searchQuery && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
            </main>
        </div>
    );
}
