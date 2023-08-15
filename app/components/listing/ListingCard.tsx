"use client";
import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../buttons/Button";
import { AiOutlineRight } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import LikeButton from "../buttons/LikeButton";

interface ListingCardProps {
  currentUser: User | null;
  listing: Listing;
  reservation?: Reservation;
  onAction?: (id: number) => void;
  disabled?: boolean;
  actionId?: number;
  actionLabel?: string;
  date?: boolean;
  price?: boolean;
}

const getDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const ListingCard: React.FC<ListingCardProps> = ({
  currentUser,
  listing,
  reservation,
  onAction,
  disabled,
  actionId,
  actionLabel,
  date = false,
  price = false,
}) => {
  const router = useRouter();
  const country = useCountries().getByValue(listing.locationValue);
  return (
    <div
      className={`flex flex-row
       w-full group
       border
       p-2
       pr-1
       sm:p-4
       rounded-xl
       border-neutral-200
       justify-between
       relative
       `}
    >
      {actionId && onAction && (
        <MdCancel
          onClick={() => {
            onAction(actionId);
          }}
          size={27}
          className={`absolute
       top-0.5 right-0.5
       sm:right-3
       sm:top-2
     text-blue-600
      hover:text-blue-900
      md:hidden lg:block xl:hidden
      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
        />
      )}
      <div className="flex flex-row gap-4">
        <div
          className="
    aspect-square
    relative
    overflow-hidden
    rounded-xl
    sm:h-[200px]
    sm:w-[200px]
    w-[110px]
    h-[110px]
   "
        >
          <Image
            onClick={() => {
              disabled ? null : router.push(`/listings/${listing.id}`);
            }}
            fill
            alt="Listing"
            src={listing.imagesSrc[0]}
            className={`object-cover
                h-full
                w-full
                group-hover:scale-110
                transition
                ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                `}
          />
          <div className="absolute top-1 right-1">
            <LikeButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            onClick={() => {
              disabled ? null : router.push(`/listings/${listing.id}`);
            }}
            className={`text-xl
         font-extrabold
         text-blue-600 
          hover:text-blue-800
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          `}
          >
            {listing.title}
          </div>
          <div className="text-sm text-neutral-600">
            {country?.label} - {country?.region}
          </div>

          {price && (
            <div className="text-sm">
              ${listing.price}{" "}
              <span className="font-light text-neutral-500">- night</span>
            </div>
          )}

          {reservation && date && (
            <span className="text-sm font-light text-neutral-500">
              {getDate(reservation.createdAt)} - {getDate(reservation.endDate)}
            </span>
          )}

          <div
            className="
             flex md:hidden lg:flex xl:hidden
             flex-row gap-2
             items-center
             text-xs font-light
            text-neutral-600"
          >
            <span
              className="p-1
            bg-blue-900
            text-white
             font-semibold
              rounded-md"
            >
              9.5
            </span>
            {"Review score"} . {"10"} reviews
          </div>

          <div className="hidden sm:block text-md text-neutral-600">
            {listing.description}
          </div>
        </div>
      </div>
      <div className="hidden md:flex lg:hidden xl:flex flex-col justify-between">
        <div className="flex flex-row gap-5 justify-end">
          <div>
            <div>{"Review score \n"}</div>
            <div className="text-sm font-light text-neutral-500">
              {"10"} reviews
            </div>
          </div>
          <div
            className="p-2 flex
             items-center
              bg-blue-900
               text-white
                rounded-md"
          >
            9.5
          </div>
        </div>
        {actionLabel && actionId && onAction && (
          <div className="">
            <Button onClick={() => onAction(actionId)} label={actionLabel} />
          </div>
        )}
      </div>
      <div
        onClick={() => {
          disabled ? null : router.push(`/listings/${listing.id}`);
        }}
        className={`
      flex md:hidden lg:flex xl:hidden
      items-center
      hover:text-neutral-200
      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      >
        <AiOutlineRight size={20} />
      </div>
    </div>
  );
};
export default ListingCard;
