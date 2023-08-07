"use client";
import { BiMenu } from "react-icons/bi";
import { useState, useCallback } from "react";
import Model from "../model/Model";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  currentUser: User | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isMenu, setIsMenu] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsMenu((isMenu) => !isMenu);
  }, []);
  return (
    <div className="md:hidden">
      <div className="flex flex-row gap-3 justify-end items-center">
        <Avatar
          onClick={() => {
            if (!currentUser) router.push("/signIn/email");
            else toggleMenu();
          }}
          src={currentUser?.image}
        />
        <div
          onClick={toggleMenu}
          className="text-white 
      text-3xl 
       hover:bg-blue-500 
       cursor-pointer 
       transition-colors
       px-3 py-3 
       rounded"
        >
          <BiMenu />
        </div>
      </div>
      <Model
        toggleMenu={toggleMenu}
        isMenu={isMenu}
        currentUser={currentUser}
      />
    </div>
  );
};

export default MobileMenu;
