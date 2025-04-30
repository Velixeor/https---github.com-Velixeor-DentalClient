import { useState } from "react";
import { ToothState, prepareProjectDTO } from "../context/TeethContext";
import { fetchWithAuth } from "./fetchWithAuth";

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const createProject = async (state: ToothState) => {
    setLoading(true);
    setError(null);

    const projectData = prepareProjectDTO(state);

    try {
      // Передаём относительный URL — он автоматически допишется к API_BASE
      const response = await fetchWithAuth("http://localhost:8080/api/v1/project/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Проект успешно создан:", result);
      alert("Проект успешно сохранён!");
    } catch (err: any) {
      console.error("Ошибка при создании проекта:", err);
      setError(err.message);
      alert("Ошибка при сохранении проекта!");
    } finally {
      setLoading(false);
    }
  };

  return { createProject, loading, error };
};
