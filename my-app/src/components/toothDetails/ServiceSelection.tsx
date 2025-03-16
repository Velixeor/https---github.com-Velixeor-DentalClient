import { useState } from "react";
import "../../styles/ToothDetails.css";

interface ServiceSelectionProps {
    onSelect: (service: { name: string; serviceId: number }) => void;
}

const serviceMap: Record<string, number> = {
    "Анатомическая коронка": 1,
    "Копинговая коронка": 2,
    "Прессованная коронка": 3,
    "Анатомический мост": 4,
    "Редуцированный мост": 5,
    "Прессованный мост": 6,
};

export function ServiceSelection({ onSelect }: ServiceSelectionProps) {
    const [selectedService, setSelectedService] = useState<string | null>(null);

    // Функция обработки выбора
    const handleSelect = (service: string) => {
        setSelectedService(service); // Обновляем выбранную строку
        // Передаем объект с именем сервиса и его ID
        onSelect({ name: service, serviceId: serviceMap[service] });
    };

    return (
        <div className="service-selection">
            <h2>Тип реставрации</h2>

            {/* Коронки */}
            <div className="service-category">
                <h3>Коронки</h3>
                <div className="options">
                    {["Анатомическая коронка", "Копинговая коронка", "Прессованная коронка"].map((service) => (
                        <button
                            key={service}
                            className={`option ${selectedService === service ? "selected" : ""}`}
                            onClick={() => handleSelect(service)}
                        >
                            {service} 
                        </button>
                    ))}
                </div>
            </div>

            {/* Протезы */}
            <div className="service-category">
                <h3>Протезы</h3>
                <div className="options">
                    {["Анатомический мост", "Редуцированный мост", "Прессованный мост"].map((service) => (
                        <button
                            key={service}
                            className={`option ${selectedService === service? "selected" : ""}`}
                            onClick={() => handleSelect(service)}
                        >
                            {service} 
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
