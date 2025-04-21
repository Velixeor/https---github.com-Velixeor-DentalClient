import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateCustomerModal.css"; // подключение стилей для модалки

export function CreateCustomerModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    await fetch("http://localhost:8081/api/v1/customer/create", {
      method: "POST",
      body: JSON.stringify({ name, phone, address }),
      headers: { "Content-Type": "application/json" },
    });
  
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Создать заказчика</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Адрес"
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Сохранить</button>
          <button className="cancel-btn" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}
