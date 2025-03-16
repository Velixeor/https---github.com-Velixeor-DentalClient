import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TeethSelector.css"; // Подключаем стили


const upperTeeth = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeeth = [31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48];

// Функция расчёта координат для овала
const getToothPosition = (index: number, total: number, isUpper: boolean) => {
  const angle = (index / (total - 1)) * Math.PI; // Делим угол на 180°
  const centerX = 50;
  const centerY = isUpper ? 15 : 65; // Для верхних зубов центр ближе к верхнему краю, для нижних — к нижнему
  const radiusX = 18;
  const radiusY = 80;

  let x = centerX + radiusX * Math.cos(angle);
  let y = centerY + radiusY * Math.sin(angle);

  if (!isUpper) y = 100 - y; // Зеркалим нижнюю челюсть, чтобы зубы шли вниз

  return { x, y };
};

export function TeethSelector() {
  const navigate = useNavigate();

  const handleClick = (toothId: number) => {
    navigate(`/tooth/${toothId}`); 
  };

  return (
    <div className="teeth-container">
      {/* Контейнер для верхних зубов */}
      <div className="lower-teeth-container">
        {upperTeeth.map((tooth, index) => {
          const { x, y } = getToothPosition(index, upperTeeth.length, false);
          return (
            <button
              key={tooth}
              className="tooth-button"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => handleClick(tooth)}
            >
              {tooth}
            </button>
          );
        })}
      </div>

      {/* Контейнер для нижних зубов */}
      <div className="upper-teeth-container">
        {lowerTeeth.map((tooth, index) => {
          const { x, y } = getToothPosition(index, lowerTeeth.length, true);
          return (
            <button
              key={tooth}
              className="tooth-button"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => handleClick(tooth)}
            >
              {tooth}
            </button>
          );
        })}
      </div>
    </div>
  );
}
