import { useEffect, useState } from "react";
import { TypeService } from "../components/prostheses/ProsthesesTable";
import { useAuth } from "../context/AuthContext";
import { fetchWithAuth } from "../hooks/fetchWithAuth";
import "../styles/CreateTechnicianModal.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface BaseStage {
  id: number;
  name: string;
  comment?: string;
}

interface PatternStage {
  id: number;
  executionStepNumber: number;
  baseStage: BaseStage;
  isNew?: boolean;
}

interface PatternStageDTO {
  id: number;
  baseStageId: number;
  baseStageName: string;
  typeServiceId: number;
  executionStepNumber: number;
}

interface Props {
  service: TypeService;
  onClose: () => void;
}

const BASE_URL = "http://localhost:8080/api/v1/project";

export function ModalProsthesisTemplate({ service, onClose }: Props) {
  const { logout } = useAuth();

  const [tasks, setTasks] = useState<PatternStage[]>([]);
  const [baseStages, setBaseStages] = useState<BaseStage[]>([]);
  const [selectedBaseStageId, setSelectedBaseStageId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (service.id === 0) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const [patternStagesRes, baseStagesRes] = await Promise.all([
          fetchWithAuth(`${BASE_URL}/pattern-stage/by-type/${service.id}`, { method: "GET" }, logout),
          fetchWithAuth(`${BASE_URL}/base-stage`, { method: "GET" }, logout),
        ]);

        if (!patternStagesRes.ok || !baseStagesRes.ok) {
          throw new Error("Ошибка при загрузке данных");
        }

        const patternStageDTOs: PatternStageDTO[] = await patternStagesRes.json();
        const baseData: BaseStage[] = await baseStagesRes.json();

        const transformedTasks: PatternStage[] = patternStageDTOs.map((dto) => ({
          id: dto.id,
          executionStepNumber: dto.executionStepNumber,
          baseStage: {
            id: dto.baseStageId,
            name: dto.baseStageName,
          },
        }));

        setTasks(transformedTasks);
        setBaseStages(baseData || []);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [service, logout]);

  const handleAddTask = async () => {
    if (selectedBaseStageId == null || !baseStages.length) return;

    const selectedBase = baseStages.find(bs => bs.id === selectedBaseStageId);
    if (!selectedBase) return;

    const newTask: PatternStage = {
      id: Date.now(), // временный id для frontend
      baseStage: selectedBase,
      executionStepNumber: tasks.length + 1,
      isNew: true,
    };

    setTasks(prev => [...prev, newTask]);
    setSelectedBaseStageId(null);
  };

  const handleRemoveTask = (id: number) => {
    setTasks(prev =>
      prev
        .filter(task => task.id !== id)
        .map((task, index) => ({
          ...task,
          executionStepNumber: index + 1,
        }))
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updated = Array.from(tasks);
    const [movedItem] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, movedItem);

    const renumbered = updated.map((t, i) => ({
      ...t,
      executionStepNumber: i + 1,
    }));

    setTasks(renumbered);
  };

  const handleSaveOrder = async () => {
    try {
      const payload = tasks.map((task, index) => ({
        id: task.isNew ? null : task.id,
        baseStageId: task.baseStage.id,
        baseStageName: task.baseStage.name,
        typeServiceId: service.id,
        executionStepNumber: index + 1,
      }));

      const response = await fetchWithAuth(`${BASE_URL}/pattern-stage/order`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }, logout);

      if (!response.ok) {
        throw new Error("Ошибка при сохранении порядка этапов");
      }

      alert("Порядок успешно сохранён");
    } catch (err) {
      console.error("Ошибка при сохранении порядка:", err);
      alert("Произошла ошибка при сохранении порядка");
    }
  };

  return (
    <div className="ctm-backdrop">
      <div className="ctm-modal">
        <h2 className="ctm-title">{service.name || "Новый протез"}</h2>

        {loading ? (
          <p>Загрузка задач...</p>
        ) : (
          <>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="taskList">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              padding: "8px",
                              marginBottom: "4px",
                              backgroundColor: "#f1f1f1",
                              borderRadius: "4px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <span>
                              {task.executionStepNumber}. {task.baseStage.name}
                              {task.baseStage.comment && ` — ${task.baseStage.comment}`}
                            </span>
                            <button
                              onClick={() => handleRemoveTask(task.id)}
                              style={{
                                marginLeft: "8px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "red",
                                fontWeight: "bold",
                              }}
                              title="Удалить задачу"
                            >
                              ❌
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            <div style={{ marginTop: "12px" }}>
              <select
                value={selectedBaseStageId ?? ""}
                onChange={(e) => setSelectedBaseStageId(Number(e.target.value))}
              >
                <option value="">Выберите задачу</option>
                {baseStages.map(bs => (
                  <option key={bs.id} value={bs.id}>
                    {bs.name}
                  </option>
                ))}
              </select>
              <button onClick={handleAddTask} disabled={selectedBaseStageId == null}>
                + Добавить задачу
              </button>
            </div>

            <button onClick={handleSaveOrder} style={{ marginTop: "12px" }}>
              💾 Сохранить порядок
            </button>
          </>
        )}

        <button onClick={onClose} style={{ marginTop: "16px" }}>Закрыть</button>
      </div>
    </div>
  );
}
