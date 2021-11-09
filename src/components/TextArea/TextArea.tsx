import clsx from "clsx";
import React, { TextareaHTMLAttributes, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TextArea.scss";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fullwidth?: boolean;
  label?: string;
  children?: never;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
};

const TextArea: React.FC<TextAreaProps> = ({
  className = "",
  fullwidth,
  label,
  id,
  style,
  ...props
}) => {
  const customIdRef = useRef(id || uuidv4());
  const customId = customIdRef.current;

  return (
    <div
      className={clsx({
        [className]: true,
        "app-text-area": true,
        "app-text-area--fullwidth": fullwidth,
      })}
      style={style}
    >
      {label && <label htmlFor={customId}>{label}</label>}
      <textarea
        className="app-text-area__input"
        id={customId}
        {...props}
      ></textarea>
    </div>
  );
};

export default TextArea;
