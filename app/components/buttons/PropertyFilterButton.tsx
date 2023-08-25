"use client"
import { IconType } from "react-icons";

interface ServiceButtonProps {
  Icon: IconType;
  label: string;
  selectedRoute: string;
  switchRoute: (routeName: string) => void;
}
const ServiceButton: React.FC<ServiceButtonProps> = ({
  Icon,
  label,
  selectedRoute,
  switchRoute,
}) => {
  return (
    <div
      onClick={() => {
        switchRoute(label);
      }}
      className={`rounded-full
       text-white
 py-2 px-3 hover:bg-blue-700
 cursor-pointer flex 
 flex-row gap-2 items-center
 ${selectedRoute === label ? "bg-blue-700 border-2" : ""}
 `}
    >
      <Icon size={20} />
      <div className="font-normal text-l truncate">{label}</div>
    </div>
  );
};

export default ServiceButton;
