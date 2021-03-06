import clsx from "clsx";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // TODO: Remove event.keyCode because is deprecated https://www.w3.org/TR/2015/WD-uievents-20150319/#h-dictionary-keyboardeventinit-members
      const key = event.key || event.keyCode;
      if (key === "Escape" || key === "Esc" || key === 27) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // TODO: Fix styles of the dropdown after the change from <li> to <button> caused by fixes a11y
  return (
    <div
      className={clsx("app-dropdown", className, {
        "app-dropdown--fullwidth": fullwidth,
      })}
      style={style}
    >
      <Button
        className="app-dropdown__button text-transform-none"
        variant="outlined"
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
        <div
          className="app-dropdown__menu"
          onClick={toggleDropdown}
          onKeyPress={toggleDropdown}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
