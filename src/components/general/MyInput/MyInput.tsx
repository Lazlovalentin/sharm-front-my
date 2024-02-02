import React, {FC, useRef, useState} from 'react';
import "./MyInput.scss"
import {gsap} from 'gsap';
import {useGSAP} from "@gsap/react";

interface MyInputProps {
    type: string;
    label?: string;
    isRequired?: boolean;
    placeholder: string;
    isPhone?: boolean
    error?: string | any;
}

const MyInput: FC<MyInputProps> = ({type, label, isRequired, placeholder, isPhone, error}) => {
    const errorRef = useRef<HTMLDivElement>(null);
    const inputId = `input-${placeholder.replace(/\s+/g, '-').toLowerCase()}`;

    const formatPlaceholder = (placeholder: string) => {
        return placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
    };

    const [input, setInput] = useState('');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (isPhone) {
            // Видаляємо все, крім цифр, і форматуємо номер телефону
            const x = value.replace(/\D/g, '').match(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,4})/);
            value = '+380 ';
            if (x) {
                value += (x[2] ? '(' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '');
            }
        }
        setInput(value);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isPhone && (e.target.value === '' || e.target.value === '+380')) {
            setInput('+380');
        }
    };

    useGSAP(() => {
        gsap.to(errorRef.current, {opacity: 1, y: -10, duration: 0.5, ease: "power1.out"});
    });


    return (
        <div className="container-my-input">
            {label ? <label htmlFor={inputId}>{label}{isRequired ? <span>*</span> : null}</label> : null}
            <input
                value={isPhone ? input : undefined}
                onChange={isPhone ? handleInput : undefined}
                onFocus={isPhone ? handleFocus : undefined}
                id={inputId}
                name={label}
                type={type}
                placeholder={isPhone ? "+38 (0__) ___ ____" : formatPlaceholder(placeholder)}
            />
            {error ? <div ref={errorRef} className="error-my-input">{error}</div> : null}
        </div>
    );
};

export default MyInput;