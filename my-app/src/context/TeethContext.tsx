import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

// Тип состояния
export interface ToothState {
  teeth: Record<
    number,
    {
      service: string | { name: string; serviceId: number };
      material: string | { name: string; materialId: number };
      servicePrice?: number;
    }
  >;
  customer: string;
  technician: string;
  patient: string;
  comment: string;
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
  comment: "",
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
  | {
      type: "SET_TOOTH_DATA";
      toothId: number;
      service: { name: string; serviceId: number };
      material: string | { name: string; materialId: number };
      servicePrice?: number;
    }
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
  | { type: "CLEAR_ALL" }
  | { type: "DELETE_TOOTH"; toothId: number }
  | {
      type: "SET_TEETH";
      teeth: Record<
        number,
        {
          service: string | { name: string; serviceId: number };
          material: string | { name: string; materialId: number };
          servicePrice?: number;
        }
      >;
    };

// Редьюсер
const reducer = (state: ToothState, action: Action): ToothState => {
  switch (action.type) {
    case "SET_TOOTH_DATA":
      return {
        ...state,
        teeth: {
          ...state.teeth,
          [action.toothId]: {
            service: action.service,
            material: action.material,
            servicePrice:
              action.servicePrice ?? state.teeth[action.toothId]?.servicePrice,
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
      return { ...state, comment: action.comment };
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
    case "SET_TEETH":
      return { ...state, teeth: action.teeth };
    case "DELETE_TOOTH": {
      const updatedTeeth = { ...state.teeth };
      delete updatedTeeth[action.toothId];
      return { ...state, teeth: updatedTeeth };
    }
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

// Безопасный парсинг JSON
const safeParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

// Создание контекста
const TeethContext = createContext<
  { state: ToothState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// TeethProvider с сохранением в localStorage
export const TeethProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const stored = localStorage.getItem("teethState");
    const parsed = stored ? safeParse(stored) : null;
    return parsed ?? initialState;
  });

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("teethState", JSON.stringify(state));
  }, [state]);

  return (
    <TeethContext.Provider value={{ state, dispatch }}>
      {children}
    </TeethContext.Provider>
  );
};

// Хук для использования контекста
export const useTeethContext = () => {
  const context = useContext(TeethContext);
  if (!context)
    throw new Error("useTeethContext must be used within a TeethProvider");
  return context;
};

// Подготовка DTO
export const prepareProjectDTO = (state: ToothState) => {
  return {
    patient: state.patient,
    comment: state.comment,
    typeOfAntagonist: state.typeOfAntagonist,
    status: "NEW",
    teethColor: state.teethColor,
    isDeleted: false,
    customerId:
      state.customerId && !isNaN(state.customerId) ? state.customerId : 0,
    technicianId:
      state.technicianId && !isNaN(state.technicianId) ? state.technicianId : 0,
    teeth: Object.entries(state.teeth).map(([id, data]) => ({
      number: Number(id),
      colorForScheme: "",
      serviceDTO: {
        id: typeof data.service === "string" ? 0 : data.service.serviceId,
        servicePrice: data.servicePrice ?? 0,
        typeServiceId:
          typeof data.service === "string" ? 0 : data.service.serviceId,
        materialId:
          typeof data.material === "string" ? 0 : data.material.materialId,
      },
    })),
    couplings: state.couplings || [],
  };
};
