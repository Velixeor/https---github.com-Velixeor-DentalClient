import { useState } from "react";
import { CheckboxFilter } from "./CheckboxFilter";

interface SidebarProps {
    onSearch: (query: string, filters: string[]) => void;
}

export function Sidebar({ onSearch }: SidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["customer", "patient"]); 

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query, selectedFilters);
    };

    return (
        <aside className="sidebar">
            <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />
            <CheckboxFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        </aside>
    );
}
