import { useState } from "react";
import "../../styles/ToothDetails.css";

interface MaterialSelectionProps {
  onSelect: (material: { name: string; materialId: number }) => void;
}
const materialMap: Record<string, number> = {
  "Цирконий": 1,
  "Многослойный цирконий": 2,
  "NP Металл": 3,
  "NP Металл (лазерный)": 4,
  "Воск": 5,
  "Акрил/ПММА": 6,
  "Композит": 7,
  "Гибридная керамика": 8,
  "Литийдисиликат": 9,
  "Стеклокерамика": 10,
};

export function MaterialSelection({ onSelect }: MaterialSelectionProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  const handleSelect = (material: string) => {
    setSelectedMaterial(material);
    onSelect({ name: material, materialId: materialMap[material] });
  };

    return (
      <div className="material-selection">
        <h2>Материалы</h2>
        <div className="materials">
          {["Цирконий", "Многослойный цирконий", "NP Металл", "NP Металл (лазерный)", "Воск",
            "Акрил/ПММА", "Композит", "Гибридная керамика", "Литийдисиликат", "Стеклокерамика"
          ].map((material) => (
            <button
              key={material}
              className={`material ${selectedMaterial === material ? "selected" : ""}`}
              onClick={() => handleSelect(material)}
            >
              {material}
            </button>
          ))}
        </div>
      </div>
    );
}
