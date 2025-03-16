import "../../styles/SelectionPanel.css";
import { Pencil } from "lucide-react";
import { useTeethContext } from "../../context/TeethContext";
import { useCustomers } from "../../hooks/useCustomers";
import { useTechnicians } from "../../hooks/useTechnicians";

export function SelectionPanel() {
  const { state, dispatch } = useTeethContext();
  const { customers, loading: loadingCustomers } = useCustomers();
  const { technicians, loading: loadingTechnicians } = useTechnicians();

  return (
    <div className="selection-panel">
      {/* Заказчик */}
      <div className="selection-group">
        <label><strong>Заказчик:</strong></label>
        <div className="selection-controls">
          <select
            value={state.customerId?.toString() || ""}
            onChange={(e) => {
              const selectedCustomer = customers.find((c) => c.id.toString() === e.target.value);
              if (selectedCustomer) {
                dispatch({ type: "SET_CUSTOMER", customer: selectedCustomer.name });
                dispatch({ type: "SET_CUSTOMER_ID", customerId: Number(selectedCustomer.id) });
              }
            }}
            disabled={loadingCustomers}
          >
            <option value="">Пожалуйста, выберите</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id.toString()}>
                {customer.name}
              </option>
            ))}
          </select>
          <button className="edit-btn"><Pencil size={16} /></button>
        </div>
      </div>

      {/* Пациент */}
      <div className="selection-group">
        <label><strong>Пациент:</strong></label>
        <div className="selection-controls">
          <input
            type="text"
            className="patient-input"
            placeholder="Введите имя пациента..."
            value={state.patient}
            onChange={(e) => dispatch({ type: "SET_PATIENT", patient: e.target.value })}
          />
          <button className="edit-btn"><Pencil size={16} /></button>
        </div>
      </div>

      {/* Техник */}
      <div className="selection-group">
        <label><strong>Техник:</strong></label>
        <div className="selection-controls">
          <select
            value={state.technicianId?.toString() || ""}
            onChange={(e) => {
              const selectedTechnician = technicians.find((t) => t.id.toString() === e.target.value);
              if (selectedTechnician) {
                dispatch({ type: "SET_TECHNICIAN", technician: selectedTechnician.name });
                dispatch({ type: "SET_TECHNICIAN_ID", technicianId: Number(selectedTechnician.id) });
              }
            }}
            disabled={loadingTechnicians}
          >
            <option value="">Пожалуйста, выберите</option>
            {technicians.map((technician) => (
              <option key={technician.id} value={technician.id.toString()}>
                {technician.name}
              </option>
            ))}
          </select>
          <button className="edit-btn"><Pencil size={16} /></button>
        </div>
      </div>
    </div>
  );
}
