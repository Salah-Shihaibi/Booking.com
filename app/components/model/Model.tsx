"use client";

import { AiOutlineClose } from "react-icons/ai";
import ModelButton from "./ModelButton";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ModelProps {
  toggleMenu: () => void;
  isMenu: boolean;
  currentUser: User | null;
}

const Model: React.FC<ModelProps> = ({ toggleMenu, isMenu, currentUser }) => {
  const router = useRouter();
  const signUp = () => {
    router.push("/signIn/email");
  };
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
          <ModelButton onClick={signUp} label="Sign Up" />
          <ModelButton onClick={signUp} label="List your property" />
        </>
      ) : (
        <>
          <ModelButton onClick={() => {}} label="Dashboard" />
          <ModelButton
            onClick={() => {
              router.push("/listings/create");
            }}
            label="List your property"
          />
          <hr />
          <ModelButton onClick={() => signOut()} label="logout" />
        </>
      )}
    </div>
  );
};

export default Model;
