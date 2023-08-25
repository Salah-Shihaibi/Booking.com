"use client"
import { IconType } from "react-icons";

interface PropertyButtonProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (category: string) => void;
}
const PropertyButton: React.FC<PropertyButtonProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        onClick(label);
      }}
      className={`
     flex flex-row gap-5
     items-center
     p-3
     cursor-pointer
     rounded
     border-2
     hover:text-neutral-800
     hover:border-blue-500
     transition
     ${selected ? "border-neutral-800" : "border-transparent"}
     ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    >
      <Icon
        size={40}
        className={`
        ${selected ? "text-blue-800" : "text-blue-500"}`}
      />
      <div>{label}</div>
    </div>
  );
};

export default PropertyButton;
