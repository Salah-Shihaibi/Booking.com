"use client";

import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";

interface AvatarProps {
  src: string | null | undefined;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ src, onClick }) => {
  const srcCp = src || "";
  return (
    <>
      {srcCp ? (
        <Image
          className="rounded-full"
          height="30"
          width="30"
          alt="Avatar"
          src={srcCp}
        />
      ) : (
        <div
          onClick={onClick}
          className="text-white 
      text-3xl 
       hover:bg-blue-500 
       cursor-pointer 
       transition-colors
       px-3 py-3 
       rounded"
        >
          <BsPersonCircle />
        </div>
      )}
    </>
  );
};

export default Avatar;
