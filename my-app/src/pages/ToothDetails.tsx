import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTeethContext } from "../context/TeethContext";
import { ServiceSelection } from "../components/toothDetails/ServiceSelection";
import { MaterialSelection } from "../components/toothDetails/MaterialSelection";
import "../styles/ToothDetails.css";

export function ToothDetails() {
  const { id } = useParams(); // Получаем ID зуба из URL
  const { state, dispatch } = useTeethContext();

  // Получаем сохранённые данные для зуба
  const toothId = Number(id);
  const selectedService = state.teeth[toothId]?.service || null;
  const selectedMaterial = state.teeth[toothId]?.material || null;
  const savedPrice = state.teeth[toothId]?.servicePrice || "";

  // Локальное состояние для цены
  const [price, setPrice] = useState(savedPrice);

  // Функция сохранения выбранных параметров
  const handleSave = () => {
    if (selectedService && selectedMaterial && price) {
      dispatch({
        type: "SET_TOOTH_DATA",
        toothId,
        service: typeof selectedService === "string" 
          ? { name: selectedService, serviceId: 0 } 
          : selectedService, 
        material: selectedMaterial,
        servicePrice: Number(price), // Добавляем цену
      });
      alert(`Сохранено: ${typeof selectedService === "string" ? selectedService : selectedService?.name} + ${selectedMaterial} за ${price} руб.`);
    } else {
      alert("Выберите услугу, материал и укажите цену");
    }
  };

  // Функция очистки выбора
  const handleClear = () => {
    setPrice(""); // Очищаем цену
    dispatch({ 
      type: "SET_TOOTH_DATA", 
      toothId, 
      service: { name: "", serviceId: 0 }, 
      material: "", 
      servicePrice: undefined, // Сбрасываем цену
    });
  };

  return (
    <div className="tooth-details-container">
      <ServiceSelection
        onSelect={(service) => {
          const serviceToDispatch = typeof service === "string" 
            ? { name: service, serviceId: 0 } 
            : service;
          dispatch({
            type: "SET_TOOTH_DATA",
            toothId,
            service: serviceToDispatch,
            material: selectedMaterial || "",
            servicePrice: Number(price), // Передаем цену
          });
        }}
      />

      <div className="main-content-detales">
        <h1>Зуб {id}</h1>
        <MaterialSelection
          onSelect={(material) => {
            dispatch({
              type: "SET_TOOTH_DATA",
              toothId,
              service: selectedService && typeof selectedService !== 'string' 
                ? selectedService 
                : { name: "", serviceId: 0 },
              material: material,
              servicePrice: Number(price), // Передаем цену
            });
          }}
        />
      </div>

      <div className="selected-parameters">
        <h2>Выбранные параметры</h2>
        <p>Услуга: {selectedService && typeof selectedService !== 'string' 
          ? selectedService.name 
          : "Не выбрано"}</p>
        <p>Материал: {selectedMaterial && typeof selectedMaterial !== 'string' 
          ? selectedMaterial.name : "Не выбрано"}</p>
        
        {/* Поле ввода цены */}
        <label>
          Цена (₽): 
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Введите цену"
          />
        </label>

        <div className="buttons">
          <button className="save-button" onClick={handleSave} disabled={!selectedService || !selectedMaterial || !price}>
            Сохранить
          </button>
          <button className="clear-button" onClick={handleClear}>
            Очистить
          </button>
        </div>
      </div>
    </div>
  );
}
