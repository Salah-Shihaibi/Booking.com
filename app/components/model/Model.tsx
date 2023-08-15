"use client";

import { AiOutlineClose } from "react-icons/ai";
import ModelButton from "./ModelButton";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PiHouseLineBold } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHouseAdd } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";

interface ModelProps {
  toggleMenu: () => void;
  isMenu: boolean;
  currentUser: User | null;
}

const Model: React.FC<ModelProps> = ({ toggleMenu, isMenu, currentUser }) => {
  const router = useRouter();
  return (
    <div
      className={`
    absolute 
    md:top-0
    md:right-0
    max-md:top-0
    max-md:left-0
     w-screen h-screen 
     bg-white z-50
     transition-all 
     ease-in-out 
     duration-500
     md:w-1/4
     md:shadow-md 
     md:h-auto
     md:rounded
      ${isMenu ? "translate-y-0 md:top-20" : "-translate-y-full"}
     `}
    >
      <div
        onClick={toggleMenu}
        className="flex flex-row
         justify-end cursor-pointer
         border-b-[1px]"
      >
        <button
          className="p-4
          hover:bg-neutral-100 
            border-0
            hover:opacity-70

        "
        >
          <AiOutlineClose size={24} />
        </button>
      </div>
      {!currentUser ? (
        <>
          <ModelButton
            onClick={() => {
              router.push("/signIn/email");
              toggleMenu();
            }}
            label="Sign Up"
          />
          <ModelButton
            onClick={() => {
              router.push("/signIn/email");
              toggleMenu();
            }}
            label="List your property"
          />
        </>
      ) : (
        <>
          <ModelButton
            onClick={() => {
              router.push("/properties");
              toggleMenu();
            }}
            label="My Properties"
            icon={PiHouseLineBold}
          />
          <ModelButton
            onClick={() => {
              router.push("/trips");
              toggleMenu();
            }}
            label="My trips"
            icon={MdDateRange}
          />
          <ModelButton
            onClick={() => {
              router.push("/saved");
              toggleMenu();
            }}
            label="Saved"
            icon={AiOutlineHeart}
          />
          <ModelButton
            onClick={() => {
              router.push("/listings/create");
              toggleMenu();
            }}
            label="List your property"
            icon={BsHouseAdd}
          />
          <hr className="border" />
          <ModelButton
            onClick={() => {
              signOut();
              toggleMenu();
            }}
            label="logout"
            icon={RiLogoutBoxLine}
          />
        </>
      )}
    </div>
  );
};

export default Model;
