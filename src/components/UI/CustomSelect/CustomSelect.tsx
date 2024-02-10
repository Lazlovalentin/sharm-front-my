import React, {FC, useState} from 'react';
import "./CustomSelect.scss";
import arrow from "./arrow.svg"
import Image from "next/image";

interface CustomSelectProps {
    options: any[];
    selectedOptions: any[];
    setSelectedOptions: (options: any[]) => void;
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

    const handleOptionChange = (selectedOption: any) => {
        if (isSingleSelect) {
            setSelectedOptions([selectedOption]);
        } else {
            setSelectedOptions((prev: any[]) => {
                const isOptionSelected = prev.find((option: any) => option.id === selectedOption.id);
                return isOptionSelected
                    ? prev.filter((option: any) => option.id !== selectedOption.id)
                    : [...prev, selectedOption];
            });
        }
    };

    const handleOptionClick = (option: any, event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        handleOptionChange(option);
    };

    return (
        <div className="container-select-admin">
            <button onClick={openSelectHandler}>
                {text}
                {isSingleSelect ? <>{selectedOptions[0].headerName}</> : null}
                <div>
                    {isSingleSelect ? <div>({options.length})</div> : null}
                    <Image src={arrow} alt={"arrow"}/>
                </div>
            </button>
            <div className={"select-options"} style={{display: openSelect ? "block" : "none"}}>
                {options.map(option => (
                    <div key={option.id} className="option-checkbox" onClick={(e) => handleOptionClick(option, e)}>
                        <input
                            type="checkbox"
                            id={option.id}
                            checked={selectedOptions.some(selected => selected.id === option.id)}
                            onChange={(e) => e.stopPropagation()} // запобігає всплиттю події, коли клікають безпосередньо на чекбокс
                        />
                        <div className="custom-checkbox"></div>
                        <label htmlFor={option.id}>{option.headerName}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;
