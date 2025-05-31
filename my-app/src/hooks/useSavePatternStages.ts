import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from './fetchWithAuth';

export type PatternStage = {
  id: number;
  baseStage: {
    id: number;
    name: string;
    comment?: string;
  };
  executionStepNumber: number;
  isNew?: boolean;
};

export function useSavePatternStages(serviceId: number) {
  const { logout } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const saveStages = async (stages: PatternStage[]) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const newStages = stages.filter(s => s.isNew);
      const existingStages = stages.filter(s => !s.isNew);

      
      if (newStages.length > 0) {
        const newPayload = newStages.map((stage, index) => ({
          baseStageId: stage.baseStage.id,
          typeServiceId: serviceId,
          executionStepNumber: index + 1 + existingStages.length,
        }));

        const response = await fetchWithAuth(
          'http://localhost:8080/api/v1/project/pattern-stage/bulk',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPayload),
          },
          logout
        );

        if (!response.ok) {
          throw new Error('Ошибка при создании новых этапов');
        }
      }

     
      if (existingStages.length > 0) {
        const updatePayload = existingStages.map((stage, index) => ({
          id: stage.id,
          baseStageId: stage.baseStage.id,
          baseStageName: stage.baseStage.name,
          typeServiceId: serviceId,
          executionStepNumber: index + 1,
        }));

        const response = await fetchWithAuth(
          'http://localhost:8080/api/v1/project/pattern-stage/order',
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatePayload),
          },
          logout
        );

        if (!response.ok) {
          throw new Error('Ошибка при обновлении порядка этапов');
        }
      }

      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return { saveStages, saving, error, success };
}
