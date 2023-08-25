"use client"
import { IconType } from "react-icons";

interface MenuItemProp {
  onClick: () => void;
  label: string;
  icon?: IconType;
}
const MenuItem: React.FC<MenuItemProp> = ({ onClick, label, icon: Icon }) => {
  return (
    <button
      className="hover:bg-neutral-100 
   transition 
   cursor-pointer
   font-medium text-l 
   px-5 py-4
   w-full
   text-left
   border-b-[1px]
   flex
   flex-row
   gap-4
   "
      onClick={onClick}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default MenuItem;
