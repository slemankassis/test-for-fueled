import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
import "./Button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullwidth?: boolean;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "default";
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  fullwidth,
  variant,
  color,
  ...props
}) => {
  return (
    <button
      className={clsx({
        "app-button": true,
        [`app-button--${variant}`]: true,
        [`app-button--${color}`]: true,
        "app-button--fullwidth": fullwidth,
        [`${className}`]: true,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: "contained",
  color: "default",
  type: "button",
};

export default Button;
