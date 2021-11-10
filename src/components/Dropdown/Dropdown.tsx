import clsx from "clsx";
import React, { useState } from "react";
import Button from "../Button/Button";
import "./Dropdown.scss";

type DropdownProps = {
  className?: string;
  title?: string;
  fullwidth?: boolean;
  style?: React.CSSProperties;
};

const Dropdown: React.FC<DropdownProps> = ({
  children,
  className = "",
  title,
  fullwidth,
  style,
}) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div
      className={clsx({
        "app-dropdown": true,
        "app-dropdown--fullwidth": fullwidth,
        [className]: true,
      })}
      style={style}
    >
      <Button
        className="app-dropdown__button"
        variant="outlined"
        type="button"
        fullwidth
        onClick={toggleDropdown}
      >
        <span>{title}</span>
        <img
          className={clsx({
            "app-dropdown__button--expand": !open,
            "app-dropdown__button--close": open,
          })}
          src="/assets/icons/chevron-down-primary.svg"
          alt="chevron-down"
        />
      </Button>
      {open && (
        <div className="app-dropdown__menu" onClick={toggleDropdown}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
