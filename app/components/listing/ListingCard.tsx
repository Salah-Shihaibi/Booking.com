"use client";
import useCountries from "@/app/hooks/useCountries";
import { Listing, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListingCardProps {
  currentUser: User | null;
  data: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ currentUser, data }) => {
  const router = useRouter();
  const country = useCountries().getByValue(data.locationValue);
  return (
    <div
      onClick={() => {
        router.push(`/listings/${data.id}`);
      }}
      className="flex flex-col gap-2 w-full group"
    >
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
      <div>
        <div className="text-lg font-bold">{data.title}</div>
        <div className="text-sm font-light text-neutral-500">
          {country?.label} - {country?.region}
        </div>
        <div>
          ${data.price}{" "}
          <span className="font-light text-neutral-500">- night</span>
        </div>
      </div>
    </div>
  );
};
export default ListingCard;
