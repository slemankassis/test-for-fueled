import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./Select.scss";

type Option = {
  label: string;
  value: string | number;
};
type SelectProps = {
  className?: string;
  fullwidth?: boolean;
  options: Option[];
  label?: string;
  style?: React.CSSProperties;
  value?: Option;
  onChange?: (value: Option) => void;
};

const Select: React.FC<SelectProps> = ({
  children,
  className = "",
  fullwidth,
  options,
  label,
  value,
  style,
  onChange,
}) => {
  const [selected, setSelected] = useState<Option | undefined>();

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelectOption = (option: Option) => (event: any) => {
    event.preventDefault();
    if (onChange) {
      onChange(option);
    } else {
      setSelected(option);
    }
  };

  return (
    <div
      className={clsx("app-select", className, {
        "app-select--fullwidth": fullwidth,
      })}
      style={style}
    >
      <label>{label}</label>
      <Dropdown
        title={selected?.label || (children as string)}
        fullwidth
      >
        {options.map((item, index) => (
          <button
            onClick={handleSelectOption(item)}
            onKeyPress={handleSelectOption(item)}
            aria-label={item.label}
            tabIndex={0}
            key={index}
          >
            {item.label}
          </button>
        ))}
      </Dropdown>
    </div>
  );
};

export default Select;
