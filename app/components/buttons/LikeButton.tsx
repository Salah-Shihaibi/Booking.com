"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { User } from "@prisma/client";
import useSavedListing from "@/app/hooks/useSavedListing";

interface HeartButtonProps {
  listingId: number;
  currentUser: User | null | undefined;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasSavedListing, toggleSavedListing } = useSavedListing({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleSavedListing}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={hasSavedListing ? "fill-blue-600" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
