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
      className={clsx({
        "app-select": true,
        "app-select--fullwidth": fullwidth,
        [className]: true,
      })}
      style={style}
    >
      <label>{label}</label>
      <Dropdown title={selected?.label || (children as string)} fullwidth>
        {options.map((item, ind) => (
          <li
            onClick={handleSelectOption(item)}
            onKeyPress={handleSelectOption(item)}
            tabIndex={0}
            role="button"
            key={ind}
          >
            {item.label}
          </li>
        ))}
      </Dropdown>
    </div>
  );
};

export default Select;
