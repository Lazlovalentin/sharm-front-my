import React, { FC, useState } from 'react';
import "./CustomSelect.scss";
import arrow from "./arrow.svg";
import Image from "next/image";

// Визначення типу для опції
interface Option {
    id: string | number; // Унікальний ідентифікатор для кожної опції
    headerName: string; // Текст, який буде відображатися
}

interface CustomSelectProps {
    options: Option[];
    selectedOptions: Option[];
    setSelectedOptions: (options: Option[] | ((prevState: Option[]) => Option[])) => void;
    isSingleSelect?: boolean;
    text: string;
}

const CustomSelect: FC<CustomSelectProps> = ({
                                                 options,
                                                 selectedOptions,
                                                 setSelectedOptions,
                                                 isSingleSelect = false,
                                                 text,
                                             }) => {
    const [openSelect, setOpenSelect] = useState(false);

    const openSelectHandler = () => setOpenSelect(!openSelect);

    const handleOptionChange = (selectedOption: Option) => {
        if (isSingleSelect) {
            setSelectedOptions([selectedOption]);
        } else {
            setSelectedOptions((prev: Option[]) => {
                const isOptionSelected = prev.find(option => option.id === selectedOption.id);
                return isOptionSelected
                    ? prev.filter(option => option.id !== selectedOption.id)
                    : [...prev, selectedOption];
            });
        }
    };

    const handleOptionClick = (option: Option, event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        handleOptionChange(option);
    };

    return (
        <div className="container-select-admin">
            <button onClick={openSelectHandler}>
                {text}
                {isSingleSelect && selectedOptions.length > 0 ? <>{selectedOptions[0].headerName}</> : null}
                <div>
                    {isSingleSelect ? <div>({options.length})</div> : null}
                    <Image src={arrow} alt="arrow"/>
                </div>
            </button>
            <div className={"select-options"} style={{display: openSelect ? "block" : "none"}}>
                {options.map(option => (
                    <div key={option.id} className="option-checkbox" onClick={(e) => handleOptionClick(option, e)}>
                        <input
                            type="checkbox"
                            id={`${option.id}`}
                            checked={selectedOptions.some(selected => selected.id === option.id)}
                            onChange={(e) => e.stopPropagation()} // Запобігає всплиттю події
                        />
                        <div className="custom-checkbox"></div>
                        <label htmlFor={`${option.id}`}>{option.headerName}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;
