import { useEffect, useState } from "react";
import { ProsthesesSearchPanel } from "../components/prostheses/ProsthesesSearchPanel";
import { ProsthesesTable } from "../components/prostheses/ProsthesesTable";
import { Pagination } from "../components/projects/Pagination";
import { ModalProsthesisTemplate } from "../modal/ModalProsthesisTemplate";
import { useTypeServices, TypeService } from "../hooks/useTypeServices";
import "../styles/Projects.css";

export function Prostheses() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProsthesis, setSelectedProsthesis] = useState<TypeService | null>(null);

  const {
    typeServices,
    loading,
    error,
    totalPages
  } = useTypeServices(page);

  const filteredProstheses = typeServices.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content-wrapper">
      <ProsthesesSearchPanel onSearch={setSearchQuery} />
      <main className="main-content">
        <div className="button-container">
          <button
            className="create-button"
            onClick={() => setSelectedProsthesis({ id: 0, name: "" })}
          >
            Создать
          </button>
        </div>

        <div className="projects-table">
          <ProsthesesTable
            prostheses={filteredProstheses}
            loading={loading}
            error={!!error}
            onRowClick={setSelectedProsthesis}
          />
        </div>

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />

        {selectedProsthesis && (
          <ModalProsthesisTemplate
            service={selectedProsthesis}
            onClose={() => setSelectedProsthesis(null)}
          />
        )}
      </main>
    </div>
  );
}
