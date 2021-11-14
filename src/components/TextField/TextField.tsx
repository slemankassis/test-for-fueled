import clsx from "clsx";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TextField.scss";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  fullwidth?: boolean;
  label?: string;
  children?: never;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const TextField: React.FC<TextFieldProps> = ({
  className,
  fullwidth,
  label,
  id,
  style,
  startAdornment,
  endAdornment,
  ...props
}) => {
  const [isOnFocus, setIsOnFocus] = useState(false);
  const customIdRef = useRef(id || uuidv4());
  const customId = customIdRef.current;

  const handleFocus = (e: any) => {
    setIsOnFocus(true);
    props.onFocus && props.onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsOnFocus(false);
    props.onBlur && props.onBlur(e);
  };

  const handleChange = (e: any) => {
    setIsOnFocus(true);
    props.onChange && props.onChange(e);
  };

  return (
    <div
      className={clsx(className, "app-text-field", {
        "app-text-field--fullwidth": fullwidth,
      })}
      style={style}
    >
      {label && <label htmlFor={customId}>{label}</label>}
      <div
        className={clsx("app-text-field__input-wrapper", {
          "app-text-field__input-wrapper--focus": isOnFocus,
        })}
      >
        {startAdornment}
        <input
          className="capitalize"
          id={customId}
          type="text"
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {endAdornment}
      </div>
    </div>
  );
};

export default TextField;
