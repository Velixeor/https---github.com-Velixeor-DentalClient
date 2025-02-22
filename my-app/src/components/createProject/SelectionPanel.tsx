import React, { useState } from "react";

export function SelectionPanel() {
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedTechnician, setSelectedTechnician] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    return (
        <div className="selection-panel">
            <h3>Выберите действие из списка справа</h3>

            <div className="selection-group">
                <label>Заказчик:</label>
                <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
                    <option value="">Выберите...</option>
                    <option value="customer1">Заказчик 1</option>
                    <option value="customer2">Заказчик 2</option>
                </select>
            </div>

            <div className="selection-group">
                <label>Техник:</label>
                <select value={selectedTechnician} onChange={(e) => setSelectedTechnician(e.target.value)}>
                    <option value="">Выберите...</option>
                    <option value="tech1">Техник 1</option>
                    <option value="tech2">Техник 2</option>
                </select>
            </div>

            <div className="selection-group">
                <label>Пользователь:</label>
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Выберите...</option>
                    <option value="user1">Пользователь 1</option>
                    <option value="user2">Пользователь 2</option>
                </select>
            </div>
        </div>
    );
}
