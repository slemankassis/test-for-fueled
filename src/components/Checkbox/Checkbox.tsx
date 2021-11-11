import clsx from "clsx";
import React, { InputHTMLAttributes, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Checkbox.scss";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  fullwidth?: boolean;
  label?: string;
  children?: never;
};

const Checkbox: React.FC<CheckboxProps> = ({
  className,
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
        [`${className}`]: true,
        "app-checkbox": true,
        "app-checkbox--fullwidth": fullwidth,
      })}
      style={style}
    >
      <input id={customId} {...props} type="checkbox" role="checkbox" />
      {label && <label htmlFor={customId}>{label}</label>}
    </div>
  );
};

export default Checkbox;
