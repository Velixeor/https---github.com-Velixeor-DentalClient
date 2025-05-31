import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from './fetchWithAuth';

export type Stage = {
  id: number;
  name: string;
  comment: string;
  confirmed: boolean;
  sentForQualityControl: boolean;
  serviceId: number;
  technicianId: number;
  executionStepNumber: number;
};

export function usePendingStages() {
  const { logout } = useAuth();
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetchWithAuth(
          'http://localhost:8080/api/v1/project/stage/pending',
          { method: 'GET' },
          logout
        );

        if (!response.ok) {
          throw new Error('Ошибка при загрузке задач на подтверждение');
        }

        const data: Stage[] = await response.json();
        setStages(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, [logout]);

  return { stages, loading, error };
}
