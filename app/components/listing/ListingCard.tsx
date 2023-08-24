"use client";
import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, Review, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../buttons/Button";
import { AiOutlineRight } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import LikeButton from "../buttons/LikeButton";
import { useMemo } from "react";
import { propertyTypes } from "@/app/data/propertyTypes";
import { mapScoreToDescription } from "@/app/utils/reviews";

interface ListingCardProps {
  currentUser: User | null;
  listing: Listing & { reviews: Review[] };
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
  const reviewScore = useMemo(() => {
    if (!listing.reviews || listing.reviews.length === 0) {
      return null;
    }
    return (
      listing.reviews.reduce((sum, item) => sum + item.reviewScore, 0) /
      listing.reviews.length
    ).toFixed(1);
  }, [listing.reviews]);

  const propertyType = propertyTypes.find((p) => listing.category === p.label);
  const Icon = propertyType?.icon;
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
    w-[130px]
    h-[130px]
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
          <div className="flex flex-row gap-1 items-center">
            {Icon && <Icon size={15} className="text-neutral-600" />}
            <div className="text-sm text-neutral-600">{listing.category}</div>
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

          {reviewScore && (
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
                {reviewScore}
              </span>
              {mapScoreToDescription(Math.round(Number(reviewScore)))} .{" "}
              {listing.reviews.length} reviews
            </div>
          )}

          <div className="hidden sm:block text-md text-neutral-600">
            {listing.description}
          </div>
        </div>
      </div>
      <div className="hidden md:flex lg:hidden xl:flex flex-col justify-between">
        <div className="flex flex-row gap-5 justify-end min-w-[160px]">
          {reviewScore ? (
            <>
              <div>
                <div>{"Review score \n"}</div>
                <div className="text-sm font-light text-neutral-500">
                  {listing.reviews.length} reviews
                </div>
              </div>
              <div
                className="p-2 flex
             items-center
              bg-blue-900
               text-white
                rounded-md"
              >
                {reviewScore}
              </div>
            </>
          ) : (
            <div
              className="p-2 flex
            items-center
             bg-blue-900
              text-white
               rounded-md"
            >
              New
            </div>
          )}
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
