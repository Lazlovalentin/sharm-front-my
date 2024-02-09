import React, {FC, useState} from 'react';
import "./CustomSelect.scss";

interface CustomSelectProps {
    options: any[];
    selectedOptions: any;
    setSelectedOptions: any;
    isSingleSelect?: boolean;
    text: string
}

const CustomSelect: FC<CustomSelectProps> = ({
                                                 options,
                                                 selectedOptions,
                                                 setSelectedOptions,
                                                 isSingleSelect = false,
                                                 text
                                             }) => {
    const [openSelect, setOpenSelect] = useState(false);

    const openSelectHandler = () => {
        setOpenSelect(!openSelect);
    };

    const handleOptionChange = (selectedOption: any) => {
        if (isSingleSelect) {
            setSelectedOptions([selectedOption]);
        } else {
            setSelectedOptions((prev: any) => {
                const isOptionSelected = prev.find((option: any) => option.id === selectedOption.id);
                if (isOptionSelected) {
                    return prev.filter((option: any) => option.id !== selectedOption.id);
                } else {
                    return [...prev, selectedOption];
                }
            });
        }
    };

    return (
        <div className="container-select-admin">
            <button onClick={openSelectHandler}>{text}</button>
            <div
                className={"select-options"}
                style={{display: openSelect ? "block" : "none"}}
            >
                {options.map(option => (
                    <div key={option.id} className="option-checkbox">
                        <input
                            type="checkbox"
                            id={option.id}
                            checked={selectedOptions.some((selected) => selected.id === option.id)}
                            onChange={() => handleOptionChange(option)}
                        />
                        <div className="custom-checkbox"></div>
                        {/* Додавання кастомного чекбокса */}
                        <label htmlFor={option.id}>{option.headerName}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CustomSelect;
