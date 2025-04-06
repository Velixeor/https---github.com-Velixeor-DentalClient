import { useState, useEffect } from "react";
import { ToothState } from "../context/TeethContext";  // Импортируй тип состояния
import { useTeethContext } from "../context/TeethContext";  // Импортируем хук для контекста

// Хук для загрузки данных из API и обновления контекста
const useFetchTeethData = (projectId: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useTeethContext();  // Получаем доступ к dispatch из контекста

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Запрос по projectId
        const response = await fetch(`http://localhost:8081/api/v1/project/${projectId}`);

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const result = await response.json();
        const teethRecord = result.teeth.reduce((acc: Record<number, any>, tooth: any) => {
          acc[tooth.number] = {
            service: tooth.serviceDTO 
              ? {
                  name: tooth.serviceDTO.serviceName,  
                  serviceId: tooth.serviceDTO.id,
                  servicePrice: tooth.serviceDTO.servicePrice,
                  typeServiceId: tooth.serviceDTO.typeServiceId,
                  materialId: tooth.serviceDTO.materialId
                }
              : { name: "", serviceId: 0, servicePrice: 0, typeServiceId: 0, materialId: 0 },
            material: tooth.serviceDTO?.materialId
              ? { name: tooth.serviceDTO.materialName, materialId: tooth.serviceDTO.materialId }
              : { name: "", materialId: 0 },
            servicePrice: tooth.serviceDTO?.servicePrice ?? 0
          };
          return acc;
        }, {});

        const formattedData: ToothState = {
            teeth: result.teeth || [], 
            customer: result.customer || "",
            technician: result.technician || "",
            patient: result.patient || "",
            comment: result.comment || "",
            typeOfAntagonist: result.typeOfAntagonist || "",
            status: result.status || "",
            teethColor: result.teethColor || "",
            isDeleted: result.isDeleted || false,
            customerId: result.customer.id ?? 0,  // Если null, заменим на 0
            technicianId: result.technician.id ?? 0,  // Если null, заменим на 0
            couplings: result.couplings || [],
          };

          // Обновляем состояние контекста с полученными данными
          dispatch({ type: "SET_CUSTOMER", customer: formattedData.customer });
          dispatch({ type: "SET_TECHNICIAN", technician: formattedData.technician });
          dispatch({ type: "SET_PATIENT", patient: formattedData.patient });
          dispatch({ type: "ADD_COMMENT", comment: formattedData.comment });
          dispatch({ type: "SET_TYPE_OF_ANTAGONIST", typeOfAntagonist: formattedData.typeOfAntagonist });
          dispatch({ type: "SET_STATUS", status: formattedData.status });
          dispatch({ type: "SET_TEETH_COLOR", teethColor: formattedData.teethColor });
          dispatch({ type: "SET_IS_DELETED", isDeleted: formattedData.isDeleted });
          dispatch({ type: "SET_CUSTOMER_ID", customerId: formattedData.customerId ?? 0 });
          dispatch({ type: "SET_TECHNICIAN_ID", technicianId: formattedData.technicianId ?? 0 });
          dispatch({ type: "SET_COUPLINGS", couplings: formattedData.couplings });
         
          dispatch({ type: "SET_TEETH", teeth: teethRecord });
  

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchData();
    }

  }, [dispatch, projectId]);  // Добавляем projectId и dispatch в зависимости

  return { loading, error };
};

export default useFetchTeethData;
