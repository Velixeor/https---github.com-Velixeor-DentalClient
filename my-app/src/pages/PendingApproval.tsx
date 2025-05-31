import React, { useState } from 'react';
import styles from '../styles/myTasks.module.css';
import {usePendingStages, Stage } from '../hooks/usePendingStages';
import { useUpdateStage } from '../hooks/useUpdateStage';

export function TasksForApproval() {
  const { stages, loading, error } = usePendingStages(); // или другой хук, если задачи для подтверждения получаются отдельно
  const { updateStage } = useUpdateStage();
  const [comments, setComments] = useState<Record<number, string>>({});
  const [processed, setProcessed] = useState<Set<number>>(new Set());

  const handleCommentChange = (stageId: number, newComment: string) => {
    setComments((prev) => ({ ...prev, [stageId]: newComment }));
  };

  const handleAction = async (stage: Stage, isApproved: boolean) => {
    try {
      const updated = {
        ...stage,
        comment: comments[stage.id] ?? stage.comment,
        confirmed: isApproved,
      };
      await updateStage(updated);
      setProcessed((prev) => new Set(prev).add(stage.id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) return <div className={styles['mytasks-container']}>Загрузка...</div>;
  if (error) return <div className={styles['mytasks-container']}>{error}</div>;

  return (
    <div className={styles['mytasks-container']}>
      <div className={styles['mytasks-header']}>Задачи на подтверждение</div>
      {stages.map((stage) => {
        const isProcessed = processed.has(stage.id);

        return (
          <div
            key={stage.id}
            className={styles['mytasks-card']} 
          >
            <p><strong>Название задачи:</strong> {stage.name}</p>
            <p><strong>ID проекта:</strong> {stage.serviceId}</p>
            <textarea
              className={styles['mytasks-textarea']}
              value={comments[stage.id] ?? stage.comment}
              onChange={(e) => handleCommentChange(stage.id, e.target.value)}
              placeholder="Комментарий к задаче..."
              disabled={isProcessed}
            />
            {isProcessed ? (
              <p className={styles['mytasks-awaiting']}>Решение отправлено</p>
            ) : (
              <div className={styles['mytasks-buttons-group']}>
                <button
                  onClick={() => handleAction(stage, true)}
                  className={styles['mytasks-button']}
                >
                  Подтвердить
                </button>
                <button
                  onClick={() => handleAction(stage, false)}
                  className={styles['mytasks-button-reject']}
                >
                  Отклонить
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

  
  