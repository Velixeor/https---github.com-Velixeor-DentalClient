import { useState, useEffect } from "react";
import "../styles/CreateTechnicianModal.css";
import { fetchWithAuth } from "../hooks/fetchWithAuth";

type Skill = {
  id: number;
  name: string;
  price?: number; // Добавляем цену скила
};

type Props = {
  onClose: () => void;
};

export function CreateTechnicianModal({ onClose }: Props) {
  const [name, setName] = useState<string>("");
  const [isOlder, setIsOlder] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [skillPrices, setSkillPrices] = useState<Record<number, number>>({}); // Состояние для хранения цен скиллов

  useEffect(() => {
    fetchWithAuth("http://localhost:8080/api/v1/project/skills")
      .then((res) => res.json())
      .then((data: Skill[]) => setSkills(data));
  }, []);

  const toggleSkill = (skillId: number) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handlePriceChange = (skillId: number, price: number) => {
    setSkillPrices((prev) => ({
      ...prev,
      [skillId]: price, // Обновляем цену скилла
    }));
  };

  const handleSave = async () => {
    await fetchWithAuth("http://localhost:8080/api/v1/project/technician/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        isOlder,
        skills: selectedSkills.map((skillId) => ({
          skillId,
          payment: skillPrices[skillId] || 0, // Используем цену для скилла
        })),
      }),
      headers: { "Content-Type": "application/json" },
    });

    onClose();
  };

  return (
    <div className="ctm-backdrop">
      <div className="ctm-modal">
        <h2 className="ctm-title">Создать техника</h2>

        <input
          className="ctm-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
        />

        <label className="ctm-label">
          <input
            className="ctm-checkbox"
            type="checkbox"
            checked={isOlder}
            onChange={(e) => setIsOlder(e.target.checked)}
          />
          Старший техник
        </label>

        <div>
          <h4 className="ctm-subtitle">Скилы:</h4>
          {skills.map((skill) => (
            <div key={skill.id} className="ctm-skill-container">
              <label className="ctm-label">
                <input
                  className="ctm-checkbox"
                  type="checkbox"
                  checked={selectedSkills.includes(skill.id)}
                  onChange={() => toggleSkill(skill.id)}
                />
                {skill.name}
              </label>
              {selectedSkills.includes(skill.id) && (
                <input
                  type="number"
                  value={skillPrices[skill.id] || ""}
                  onChange={(e) => handlePriceChange(skill.id, Number(e.target.value))}
                  placeholder="Цена"
                  className="ctm-price-input"
                />
              )}
            </div>
          ))}
        </div>

        <div className="ctm-buttons">
          <button className="ctm-button primary" onClick={handleSave}>
            Сохранить
          </button>
          <button className="ctm-button" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
