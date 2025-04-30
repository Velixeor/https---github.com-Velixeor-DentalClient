import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from './fetchWithAuth';
import { Stage } from './useTechnicianStages';

export function useUpdateStage() {
  const { logout } = useAuth();

  const updateStage = async (stage: Stage) => {
    const updatedStage = {
      ...stage,
      sentForQualityControl: true,
    };

    const response = await fetchWithAuth(
      'http://localhost:8080/api/v1/project/stage',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStage),
      },
      logout
    );

    if (!response.ok) {
      throw new Error('Не удалось обновить стадию');
    }

    return await response.json();
  };

  return { updateStage };
}