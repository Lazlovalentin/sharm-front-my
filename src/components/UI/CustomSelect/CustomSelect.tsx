import React, {FC, useState} from 'react';
import "./CustomSelect.scss";

interface CustomSelectProps {
    options: any[];
    selectedOptions: any;
    setSelectedOptions: any;
}

const CustomSelect: FC<CustomSelectProps> = ({options, selectedOptions, setSelectedOptions}) => {
    const [openSelect, setOpenSelect] = useState(false);

    const openSelectHandler = () => {
        setOpenSelect(!openSelect);
    };

    const handleOptionChange = (selectedOption) => {
        setSelectedOptions(prev => {
            const isOptionSelected = prev.find(option => option.id === selectedOption.id);
            if (isOptionSelected) {
                // Видаляємо об'єкт, якщо він уже був вибраний
                return prev.filter(option => option.id !== selectedOption.id);
            } else {
                // Додаємо об'єкт, якщо він не був вибраний
                return [...prev, selectedOption];
            }
        });
    };
    return (
        <div className="container-select-admin">
            <button onClick={openSelectHandler}>Choose columns</button>
            <div
                className={"select-options"}
                style={{display: openSelect ? "block" : "none"}}
            >
                {options.map(option => (
                    <div key={option.id} className="option-checkbox">
                        <input
                            type="checkbox"
                            id={option.id}
                            // Перевіряємо, чи об'єкт присутній в масиві, для встановлення checked статусу
                            checked={selectedOptions.some(selected => selected.id === option.id)}
                            onChange={() => handleOptionChange(option)}
                        />
                        <label htmlFor={option.id}>{option.headerName}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CustomSelect;
