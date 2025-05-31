import { useState } from "react";

interface ProsthesesSearchPanelProps {
  onSearch: (query: string) => void;
}

export function ProsthesesSearchPanel({ onSearch }: ProsthesesSearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <aside className="sidebar">
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
    </aside>
  );
}
