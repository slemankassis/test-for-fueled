import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Dropdown.scss";

type Option = {
  label: string;
  value: string;
};
type DropdownProps = {
  className?: string;
  fullwidth?: boolean;
  options: Option[];
  style?: React.CSSProperties;
  onChange?: (value: Option) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  children,
  className = "",
  fullwidth,
  options,
  style,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>("");

  const toggleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setSelected(children);
  }, [children]);

  const handleSelectOption = (option: Option) => () => {
    if (onChange) {
      onChange(option);
    } else {
      setSelected(option.label);
    }
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
        fullwidth
        onClick={toggleDropdown}
      >
        <span>{selected}</span>
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
          {options.map((item, ind) => (
            <li onClick={handleSelectOption(item)} key={ind}>
              {item.label}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
