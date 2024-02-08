import React, {FC, useState} from 'react';
import "./CustomSelect.scss";

interface CustomSelectProps {
    options: any[];
    selectedOptions: any;
    setSelectedOptions: any;
    isSingleSelect?: boolean;
}

const CustomSelect: FC<CustomSelectProps> = ({
                                                 options,
                                                 selectedOptions,
                                                 setSelectedOptions,
                                                 isSingleSelect = false,
                                             }) => {
    const [openSelect, setOpenSelect] = useState(false);

    const openSelectHandler = () => {
        setOpenSelect(!openSelect);
    };

    const handleOptionChange = (selectedOption: Option) => {
        if (isSingleSelect) {
            setSelectedOptions([selectedOption]);
        } else {
            setSelectedOptions(prev => {
                const isOptionSelected = prev.find(option => option.id === selectedOption.id);
                if (isOptionSelected) {
                    return prev.filter(option => option.id !== selectedOption.id);
                } else {
                    return [...prev, selectedOption];
                }
            });
        }
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
