import React, {
  FC,
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import "./MyInput.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { resolveCaa } from "node:dns";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  isPhone?: boolean;
  error?: string | any;
  register?: any;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

// eslint-disable-next-line react/display-name
const MyInput: FC<MyInputProps> = forwardRef<HTMLInputElement, MyInputProps>(
  (
    {
      type,
      label,
      isRequired,
      placeholder = "",
      isPhone,
      error,
      register,
      onChange,
      name,
      ...props
    },
    ref
  ) => {
    const errorRef = useRef<HTMLDivElement>(null);
    const inputId = `input-${placeholder?.replace(/\s+/g, "-").toLowerCase()}`;

    const [input, setInput] = useState("");

    const formatPlaceholder = (placeholder: string) => {
      if (!placeholder) return "";
      return placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      const x = value
        .replace(/\D/g, "")
        .match(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,4})/);
      value = "+380 ";
      if (x) {
        value +=
          (x[2] ? "(" + x[2] : "") +
          (x[3] ? ") " + x[3] : "") +
          (x[4] ? "-" + x[4] : "");
      }
      setInput(value);
      if (onChange) onChange({ ...e, target: { ...e.target, value: value } });
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isPhone && (e.target.value === "" || e.target.value === "+380")) {
        setInput("+380");
      }
    };

    useGSAP(() => {
      if (error) {
        gsap.fromTo(
          errorRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out" }
        );
      }
    }, [error]);

    return (
      <div className="container-my-input">
        {label ? (
          <label htmlFor={inputId}>
            {label}
            {isRequired ? <span>*</span> : null}
          </label>
        ) : null}
        <input
          ref={ref}
          defaultValue={props.defaultValue || ""}
          value={isPhone ? input : undefined}
          onChange={isPhone ? handleInput : onChange || undefined}
          onFocus={isPhone ? handleFocus : undefined}
          id={inputId}
          name={name}
          type={type}
          placeholder={
            isPhone ? "+38 (0__) ___ ____" : formatPlaceholder(placeholder)
          }
          {...register}
          {...props}
        />
        {error ? (
          <div ref={errorRef} className="error-my-input">
            {error}
          </div>
        ) : null}
      </div>
    );
  }
);
export default MyInput;
