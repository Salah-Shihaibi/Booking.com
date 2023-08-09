import React, { useCallback } from "react";

interface buttonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  width?: string;
}

const Button: React.FC<buttonProps> = ({
  onClick,
  disabled = false,
  label,
  width = "w-full",
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
                font-medium text-l 
                cursor-pointer 
                px-3 py-2 
                rounded
                mt-4
                hover:bg-blue-800
                ${width}
                  `}
    >
      {label}
    </button>
  );
};

export default Button;
