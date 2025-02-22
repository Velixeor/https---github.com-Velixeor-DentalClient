interface FilterProps {
    selectedFilters: string[];
    setSelectedFilters: (filters: string[]) => void;
}

export function CheckboxFilter({ selectedFilters, setSelectedFilters }: FilterProps) {
    const filters = ["customer", "patient", "dateCreate"];

    const handleCheckboxChange = (filter: string) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(f => f !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    return (
        <div className="filter-container">
            {filters.map(filter => (
                <label key={filter}>
                    <input
                        type="checkbox"
                        checked={selectedFilters.includes(filter)}
                        onChange={() => handleCheckboxChange(filter)}
                    />
                    {filter === "customer" ? "Заказчик" : filter === "patient" ? "Пациент" : "Дата создания"}
                </label>
            ))}
        </div>
    );
}
