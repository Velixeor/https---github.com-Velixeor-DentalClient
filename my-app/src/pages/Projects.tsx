import { useState, useEffect } from "react";
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["customer", "patient"]);

  const navigate = useNavigate();

  // обычная пагинированная выдача
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    totalPages: projectsTotalPages
  } = useProjects(page);

  // поиск (с теперь ожидаемым totalPages в ответе)
  const {
    searchResults,
    totalPages: searchTotalPages,
    loading: searchLoading,
    error: searchError
  } = useSearchProjects(searchQuery, selectedFilters);

  // сортировка (не меняется)
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

  // что отображать и какой лоадинг/ошибку показывать
  const displayedProjects = searchQuery ? searchResults : projects;
  const isLoading = searchQuery ? searchLoading : projectsLoading;
  const isError = searchQuery ? searchError : projectsError;

  // какую пагинацию рендерить
  const activeTotalPages = searchQuery ? searchTotalPages : projectsTotalPages;

  return (
    <div className="content-wrapper">
      <Sidebar
        onSearch={(query, filters) => {
          setSearchQuery(query);
          setSelectedFilters(filters);
          setPage(1); // сбрасываем страницу при новом поиске
        }}
      />

      <main className="main-content">
        <div className="button-container">
          <button
            className="create-button"
            onClick={() => navigate("/create?mode=draft")}
          >
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

        <Pagination
          page={page}
          totalPages={activeTotalPages}
          setPage={setPage}
        />
      </main>
    </div>
  );
}
