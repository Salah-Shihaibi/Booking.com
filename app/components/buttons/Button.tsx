"use client"
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface buttonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  width?: string;
  icon?: IconType;
}

const Button: React.FC<buttonProps> = ({
  onClick,
  disabled = false,
  label,
  width = "w-full",
  icon: Icon,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onClick();
  }, [disabled, onClick]);
  return (
    <button
      onClick={handleSubmit}
      disabled={disabled}
      className={`

                disabled:opacity-70
                disabled:cursor-not-allowed
              text-white 
              bg-blue-600
                font-medium text-lg 
                cursor-pointer 
                px-3 py-2 
                rounded
                hover:bg-blue-800
                transition
                ${width}
                ${Icon && "flex flex-row items-center gap-2"}
                  `}
    >
      {Icon && <Icon size={25} />}
      {label}
    </button>
  );
};

export default Button;
