import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Stepper.scss";

type StepperProps = {
  className?: string;
  fullwidth?: boolean;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "default";
  value?: number;
  onChange?: (value: any) => void;
};

const Stepper: React.FC<StepperProps> = ({
  children,
  className,
  onChange,
  value = 0,
  ...props
}) => {
  const [step, setStep] = useState(value);

  const handleChange = (value: number) => () => {
    if (onChange) onChange(value);
    setStep(value);
  };

  useEffect(() => {
    setStep(value);
  }, [value]);

  return (
    <Button className={clsx("app-stepper", className)} type="button" {...props}>
      <img
        src="/assets/icons/minus.svg"
        alt="minus"
        className="cursor-pointer mr-2"
        onClick={handleChange(step - 1 < 0 ? 0 : step - 1)}
      />
      {step}
      <img
        src="/assets/icons/plus.svg"
        alt="plus"
        className="cursor-pointer ml-2"
        onClick={handleChange(step + 1)}
      />
    </Button>
  );
};

Stepper.defaultProps = {
  variant: "text",
  color: "default",
};

export default Stepper;
