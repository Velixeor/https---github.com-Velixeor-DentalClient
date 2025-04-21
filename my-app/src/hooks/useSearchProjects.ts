import { useState, useEffect } from "react";
import { Project } from "../types";

export function useSearchProjects(searchQuery: string, filters: string[]) {
    const [searchResults, setSearchResults] = useState<Project[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults([]);
            setTotalPages(1);
            return;
        }

        setLoading(true);
        const filterParams = filters.map(f => `filter=${f}`).join("&");
        const url = `http://localhost:8081/api/v1/project/search?query=${encodeURIComponent(searchQuery)}&${filterParams}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка поиска");
                return res.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.projects)) {
                    setSearchResults(data.projects);
                    setTotalPages(data.totalPages || 1);
                } else {
                    console.warn("Ожидался объект с массивом 'projects', получено:", data);
                    setSearchResults([]);
                    setTotalPages(1);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка при поиске проектов:", err);
                setError(err.message);
                setSearchResults([]);
                setTotalPages(1);
                setLoading(false);
            });
    }, [searchQuery, filters]);

    return { searchResults, totalPages, loading, error };
}
