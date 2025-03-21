import { useState, useEffect } from "react";

interface Technician {
    id: string;
    name: string;
}

export function useTechnicians() {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTechnicians() {
            try {
                const response = await fetch("http://localhost:8081/api/v1/technician"); 
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
        }

        fetchTechnicians();
    }, []);

    return { technicians, loading, error };
}
