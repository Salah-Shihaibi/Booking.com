"use client";
import { User } from "@prisma/client";
import { useState, useCallback } from "react";
import Model from "../model/Model";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";

interface PcMenuProps {
  currentUser: User | null;
}

const PcMenu: React.FC<PcMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isMenu, setIsMenu] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsMenu((isMenu) => !isMenu);
  }, []);
  return (
    <div className="hidden md:block pr-3">
      <div className="flex flex-row item-center justify-between items-center gap-3">
        <button
          onClick={() => {
            router.push("/listings/create");
          }}
          className="text-white 
      font-medium text-l 
       hover:bg-blue-500 
       cursor-pointer 
       transition-colors
       px-3 py-3 
       rounded"
        >
          List Your Property
        </button>

        {currentUser ? (
          <div onClick={toggleMenu}>
            <Avatar src={currentUser.image} />
          </div>
        ) : (
          <>
            <button
              onClick={() => router.push("/signIn/email")}
              className="text-blue-500 
      bg-white
      font-medium text-l 
       cursor-pointer 
       px-3 py-2 
       rounded"
            >
              Sign In
            </button>
          </>
        )}
      </div>
      <Model
        toggleMenu={toggleMenu}
        isMenu={isMenu}
        currentUser={currentUser}
      />
    </div>
  );
};

export default PcMenu;
