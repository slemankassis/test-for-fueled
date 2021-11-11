import clsx from "clsx";
import React, { InputHTMLAttributes, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Radio.scss";

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  fullwidth?: boolean;
  label?: string;
  children?: never;
};

const Radio: React.FC<RadioProps> = ({
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
      className={clsx(className, "app-radio", {
        "app-radio--fullwidth": fullwidth,
      })}
      style={style}
    >
      <input id={customId} {...props} type="radio" />
      {label && <label htmlFor={customId}>{label}</label>}
    </div>
  );
};

export default Radio;
