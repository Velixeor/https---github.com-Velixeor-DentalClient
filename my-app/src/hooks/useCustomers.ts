import { useState, useEffect } from "react";

interface Customer {
    id: string;
    name: string;
}

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await fetch("http://localhost:8081/api/v1/customer");
                if (!response.ok) {
                    throw new Error("Ошибка загрузки заказчиков");
                }
                const data: Customer[] = await response.json();
                setCustomers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchCustomers();
    }, []);

    return { customers, loading, error };
}
