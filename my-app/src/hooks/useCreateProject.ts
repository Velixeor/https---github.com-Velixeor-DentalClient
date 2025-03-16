import { useState } from "react";
import { ToothState, prepareProjectDTO } from "../context/TeethContext";

const API_URL = "http://localhost:8081/api/v1/project/create";

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (state: ToothState) => {
    setLoading(true);
    setError(null);

    const projectData = prepareProjectDTO(state);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
