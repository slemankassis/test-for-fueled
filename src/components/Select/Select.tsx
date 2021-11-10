import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import "./Select.scss";

type Option = {
  label: string;
  value: string;
};
type SelectProps = {
  className?: string;
  fullwidth?: boolean;
  options: Option[];
  label?: string;
  style?: React.CSSProperties;
  onChange?: (value: Option) => void;
};

const Select: React.FC<SelectProps> = ({
  children,
  className = "",
  fullwidth,
  options,
  label,
  style,
  onChange,
}) => {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    setSelected(children as string);
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
        "app-select": true,
        [className]: true,
      })}
      style={style}
    >
      <label>{label}</label>
      <Dropdown title={selected} fullwidth>
        {options.map((item, ind) => (
          <li onClick={handleSelectOption(item)} key={ind}>
            {item.label}
          </li>
        ))}
      </Dropdown>
    </div>
  );
};

export default Select;
