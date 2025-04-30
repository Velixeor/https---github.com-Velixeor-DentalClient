import { useState, useEffect } from "react";
import { fetchWithAuth } from "./fetchWithAuth";

interface Technician {
    id: string;
    name: string;
}

export function useTechnicians() {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Функция для подгрузки данных техников
    const fetchTechnicians = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth("http://localhost:8080/api/v1/project/technician");
            if (!response.ok) {
                throw new Error("Ошибка загрузки техников");
            }
            const data: Technician[] = await response.json();
            setTechnicians(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        fetchTechnicians();
    }, []);

    return { technicians, loading, error, fetchTechnicians };  // Возвращаем fetchTechnicians
}
