import React from "react";

type RemoveButtonProps = {
  handleClick?: (value: any) => void;
  handleKeyPress?: (value: any) => void;
};

const RemoveButton: React.FC<RemoveButtonProps> = ({
  handleClick,
  handleKeyPress,
}) => {
  return (
    <img
      className="cursor-pointer"
      src="/assets/icons/cross.svg"
      alt="cross"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    />
  );
};

export default RemoveButton;
