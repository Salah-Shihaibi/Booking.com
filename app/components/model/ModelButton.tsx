interface MenuItemProp {
  onClick: () => void;
  label: string;
}
const MenuItem: React.FC<MenuItemProp> = ({ onClick, label }) => {
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
   "
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MenuItem;
