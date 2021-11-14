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

  // TODO: Make this component focusable and add ful keyboard suppport because isn't allowed to do changes with keyboard navigation https://www.w3.org/TR/wai-aria-practices/examples/radio/radio-1/radio-1.html
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
