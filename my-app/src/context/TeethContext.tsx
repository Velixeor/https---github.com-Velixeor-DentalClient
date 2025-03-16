import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Определяем структуру состояния
export interface ToothState {
  teeth: Record<
    number,
    {
      service: string | { name: string; serviceId: number };
      material: string | { name: string; materialId: number };
      servicePrice?: number; 
    }>;
  customer: string;
  technician: string;
  patient: string;
  comments: string[];
  typeOfAntagonist: string;
  status: string;
  teethColor: string;
  isDeleted: boolean;
  customerId: number | null;
  technicianId: number | null;
  couplings: any[];
}

// Начальное состояние
const initialState: ToothState = {
  teeth: {},
  customer: "",
  technician: "",
  patient: "",
  comments: [],
  typeOfAntagonist: "",
  status: "",
  teethColor: "",
  isDeleted: false,
  customerId: null,
  technicianId: null,
  couplings: [],
};

// Типы действий
type Action =
  | { type: "SET_TOOTH_DATA"; toothId: number; service: { name: string; serviceId: number }; material: string| { name: string; materialId: number }; servicePrice?: number;}
  | { type: "SET_CUSTOMER"; customer: string }
  | { type: "SET_TECHNICIAN"; technician: string }
  | { type: "SET_PATIENT"; patient: string }
  | { type: "ADD_COMMENT"; comment: string }
  | { type: "SET_TYPE_OF_ANTAGONIST"; typeOfAntagonist: string }
  | { type: "SET_STATUS"; status: string }
  | { type: "SET_TEETH_COLOR"; teethColor: string }
  | { type: "SET_IS_DELETED"; isDeleted: boolean }
  | { type: "SET_CUSTOMER_ID"; customerId: number }
  | { type: "SET_TECHNICIAN_ID"; technicianId: number }
  | { type: "SET_COUPLINGS"; couplings: any[] }
  | { type: "CLEAR_ALL" };

// Редьюсер для изменения состояния
const reducer = (state: ToothState, action: Action): ToothState => {
  switch (action.type) {
    case "SET_TOOTH_DATA":
  return {
    ...state,
    teeth: {
      ...state.teeth,
      [action.toothId]: {
        service: typeof action.service === "string" ? action.service : action.service,
        material: action.material,
        servicePrice: action.servicePrice ?? state.teeth[action.toothId]?.servicePrice, // Сохраняем или обновляем цену
      },
    },
  };
    case "SET_CUSTOMER":
      return { ...state, customer: action.customer };
    case "SET_TECHNICIAN":
      return { ...state, technician: action.technician };
    case "SET_PATIENT":
      return { ...state, patient: action.patient };
    case "ADD_COMMENT":
      return { ...state, comments: [...state.comments, action.comment] };
    case "SET_TYPE_OF_ANTAGONIST":
      return { ...state, typeOfAntagonist: action.typeOfAntagonist };
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "SET_TEETH_COLOR":
      return { ...state, teethColor: action.teethColor };
    case "SET_IS_DELETED":
      return { ...state, isDeleted: action.isDeleted };
    case "SET_CUSTOMER_ID":
      return { ...state, customerId: action.customerId };
    case "SET_TECHNICIAN_ID":
      return { ...state, technicianId: action.technicianId };
    case "SET_COUPLINGS":
      return { ...state, couplings: action.couplings };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

// Создаём контекст
const TeethContext = createContext<{ state: ToothState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Провайдер
export const TeethProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <TeethContext.Provider value={{ state, dispatch }}>{children}</TeethContext.Provider>;
};

// Хук для использования контекста
export const useTeethContext = () => {
  const context = useContext(TeethContext);
  if (!context) throw new Error("useTeethContext must be used within a TeethProvider");
  return context;
};

// Функция подготовки ProjectDTO
export const prepareProjectDTO = (state: ToothState) => {
  return {
    patient: state.patient,
    comment: state.comments.join("; "),
    typeOfAntagonist: state.typeOfAntagonist,
    status: "NEW",
    teethColor: state.teethColor,
    isDeleted: false,
    customerId: state.customerId && !isNaN(state.customerId) ? state.customerId : 0,
    technicianId: state.technicianId && !isNaN(state.technicianId) ? state.technicianId : 0,
    teeth: Object.entries(state.teeth).map(([id, data]) => ({
      number: Number(id),
      colorForScheme: "", // Можно добавить цвет
      serviceDTO: {
        id: typeof data.service === "string" ? 0 : data.service.serviceId,
        servicePrice: data.servicePrice ?? 0, // Добавляем цену
        typeServiceId: typeof data.service === "string" ? 0 : data.service.serviceId,
        materialId: typeof data.material === "string" ? 0 : data.material.materialId,
      },
    })),
    couplings: state.couplings || [],
  };
};
