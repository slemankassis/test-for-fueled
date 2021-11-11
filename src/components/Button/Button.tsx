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
      className={clsx(
        "app-button",
        `app-button--${variant}`,
        `app-button--${color}`,
        className,
        {
          "app-button--fullwidth": fullwidth,
        }
      )}
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
