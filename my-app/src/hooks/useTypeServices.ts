import { useState, useEffect } from "react";
import { fetchWithAuth } from "./fetchWithAuth";

export interface TypeService {
  id: number;
  name: string;
}

export const useTypeServices = (page: number) => {
  const [typeServices, setTypeServices] = useState<TypeService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchWithAuth(`http://localhost:8080/api/v1/project/type-service?page=${page - 1}&size=10`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки сервисов");
        return res.json();
      })
      .then((data: { content: TypeService[]; totalPages: number }) => {
        setTypeServices(data.content || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  return { typeServices, loading, error, totalPages };
};