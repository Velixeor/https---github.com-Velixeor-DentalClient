
import { useState, useEffect } from "react";
import { Project } from "../types"; // Твой тип данных
import { fetchWithAuth } from "./fetchWithAuth";

export const useProjects = (page: number) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetchWithAuth(`http://localhost:8080/api/v1/project?page=${page}&size=10`)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки данных");
                return res.json();
            })
            .then((data: { projects: Project[], totalPages: number }) => {
                setProjects(data.projects || []);
                setTotalPages(data.totalPages || 1);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [page]);

    return { projects, loading, error, totalPages };
};
