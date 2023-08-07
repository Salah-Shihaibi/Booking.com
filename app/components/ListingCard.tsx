import { Listing, User } from "@prisma/client";
import Image from "next/image";

interface ListingCardProps {
  currentUser: User | null;
  data: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ currentUser, data }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="
    aspect-square
    w-full
    relative
    overflow-hidden
    rounded-xl
   "
      >
        <Image
          fill
          alt="Listing"
          src={data.imagesSrc[0]}
          className="object-cover
                h-full
                w-full
                group-hover:scale-110
                transition"
        />
      </div>
    </div>
  );
};
export default ListingCard;
