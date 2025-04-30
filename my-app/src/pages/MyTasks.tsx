import React, { useState } from 'react';
import styles from '../styles/myTasks.module.css';
import { useTechnicianStages, Stage } from '../hooks/useTechnicianStages';
import { useUpdateStage } from '../hooks/useUpdateStage';

export function MyTasks() {
  const { stages, loading, error } = useTechnicianStages();
  const { updateStage } = useUpdateStage();
  const [comments, setComments] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Set<number>>(new Set());

  const handleCommentChange = (stageId: number, newComment: string) => {
    setComments((prev) => ({ ...prev, [stageId]: newComment }));
  };

  const handleSubmit = async (stage: Stage) => {
    try {
      const updated = {
        ...stage,
        comment: comments[stage.id] ?? stage.comment,
      };
      await updateStage(updated);
      setSubmitted((prev) => new Set(prev).add(stage.id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) return <div className={styles['mytasks-container']}>Загрузка...</div>;
  if (error) return <div className={styles['mytasks-container']}>{error}</div>;

  return (
    <div className={styles['mytasks-container']}>
      <div className={styles['mytasks-header']}>Иван Иванов</div>
      {stages.map((stage) => {
        const isSubmitted = submitted.has(stage.id) || stage.sentForQualityControl;

        return (
          <div
            key={stage.id}
            className={`${styles['mytasks-card']} ${isSubmitted ? styles['mytasks-submitted'] : ''}`}
          >
            <p><strong>Название задачи:</strong> {stage.name}</p>
            <p><strong>ID проекта:</strong> {stage.serviceId}</p>
            <textarea
              className={styles['mytasks-textarea']}
              value={comments[stage.id] ?? stage.comment}
              onChange={(e) => handleCommentChange(stage.id, e.target.value)}
              placeholder="Комментарий к задаче..."
              disabled={isSubmitted}
            />
            {isSubmitted ? (
              <p className={styles['mytasks-awaiting']}>Ожидает проверки</p>
            ) : (
              <button
                onClick={() => handleSubmit(stage)}
                className={styles['mytasks-button']}
              >
                Отправить на проверку
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
