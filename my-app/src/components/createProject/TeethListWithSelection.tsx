import React, { useState } from "react";
import { useTeethContext } from "../../context/TeethContext";
import { useCreateProject } from "../../hooks/useCreateProject"; // Импортируем хук
import "../../styles/TeethListWithSelection.css";

export function TeethListWithSelection() {
  const { state, dispatch } = useTeethContext();
  const { createProject, loading } = useCreateProject(); // Используем хук

  const [selectedTypeOfAntagonist, setSelectedTypeOfAntagonist] = useState(state.typeOfAntagonist);
  const [selectedTeethColor, setSelectedTeethColor] = useState(state.teethColor);

  const antagonistTypes = ["A1", "A2", "B1", "B2"];
  const teethColors = ["WHITE", "YELLOW", "GRAY"];

  const handleSave = () => {
    createProject(state);
  };

  const handleAntagonistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTypeOfAntagonist = event.target.value;
    setSelectedTypeOfAntagonist(newTypeOfAntagonist);
    dispatch({
      type: "SET_TYPE_OF_ANTAGONIST",
      typeOfAntagonist: newTypeOfAntagonist,
    });
  };

  const handleTeethColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTeethColor = event.target.value;
    setSelectedTeethColor(newTeethColor);
    dispatch({
      type: "SET_TEETH_COLOR",
      teethColor: newTeethColor,
    });
  };

  return (
    <div className="teeth-list-container">
      <h2>Выберите зубы и их параметры</h2>

      <div className="teeth-list">
        {Object.entries(state.teeth).map(([toothId, toothData]) => (
          <div key={toothId} className="tooth-item">
            <h3>Зуб {toothId}</h3>
            <p>Услуга: {typeof toothData.service === "string" ? toothData.service : toothData.service.name}</p>
            <p>Материал: {typeof toothData.material === "string" ? toothData.material : toothData.material.name}</p>
          </div>
        ))}
      </div>

      <div className="dropdowns">
        <div className="dropdown">
          <label htmlFor="antagonist-select">Тип антагониста</label>
          <select id="antagonist-select" value={selectedTypeOfAntagonist} onChange={handleAntagonistChange}>
            {antagonistTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="teeth-color-select">Цвет зубов</label>
          <select id="teeth-color-select" value={selectedTeethColor} onChange={handleTeethColorChange}>
            {teethColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="save-button" onClick={handleSave} disabled={loading}>
        {loading ? "Сохранение..." : "Сохранить"}
      </button>
    </div>
  );
}
