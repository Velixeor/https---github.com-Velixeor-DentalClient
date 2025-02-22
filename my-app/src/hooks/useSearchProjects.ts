import { useState, useEffect } from "react";
import { Project } from "../types";

export function useSearchProjects(searchQuery: string, filters: string[]) {
    const [searchResults, setSearchResults] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        const filterParams = filters.map(f => `filter=${f}`).join("&"); 
        fetch(`http://localhost:8081/api/v1/project/search?query=${searchQuery}&${filterParams}`)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка поиска");
                return res.json();
            })
            .then((data: Project[]) => {
                setSearchResults(data || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setSearchResults([]);
                setLoading(false);
            });
    }, [searchQuery, filters]);

    return { searchResults, loading, error };
}
