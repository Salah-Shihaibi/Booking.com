"use client";

import Heading from "@/app/components/Heading";
import useCountries from "@/app/hooks/useCountries";
import Map from "@/app/components/Map";
import { Listing, Reservation, Review, User } from "@prisma/client";
import Image from "next/image";
import Avatar from "@/app/components/Avatar";
import ListingReservation from "@/app/components/listing/ListingReservation";
import Reviews from "@/app/components/reviews/Reviews";
import { propertyTypes } from "@/app/data/propertyTypes";
import ImageSlide from "@/app/components/ImageSlide";

interface ListingPageClientProps {
  listing: Listing & { user: User; reviews: (Review & { user: User })[] };
  currentUser: User | null;
  reservations?: Reservation[] | null;
}

const ListingPageClient: React.FC<ListingPageClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const country = useCountries().getByValue(listing.locationValue);
  const propertyType = propertyTypes.find((p) => listing.category === p.label);
  const Icon = propertyType?.icon;

  return (
    <div
      className="
      max-w-screen-lg
      mx-auto
    "
    >
      <div className="flex flex-col gap-6">
        <Heading
          title={listing.title}
          subtitle={`${country?.region}, ${country?.label}`}
        />
        <div
          className="
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative
          "
        >
          <ImageSlide base64Strings={listing.imagesSrc} />
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-full order-last lg:col-span-5 lg:order-first flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div
                className="
              text-xl
              font-semibold
              flex
              flex-row
              items-center
              gap-2
            "
              >
                <div>Hosted by {listing?.user?.email}</div>
                <Avatar src={listing?.user?.image} />
              </div>
              <div
                className="
              flex
              flex-row
              items-center
              gap-4
              font-light
              text-neutral-500
            "
              >
                <div>{listing.guestCount} guests</div>
                <div>{listing.roomCount} rooms</div>
                <div>{listing.bathroomCount} bathrooms</div>
              </div>
            </div>
            <hr />
            <div className="flex flex-row gap-8 items-center">
              {Icon && <Icon size={60} className="text-neutral-600" />}
              <div className="flex flex-col">
                <div className="text-lg font-semibold">
                  {propertyType?.label}
                </div>
                <div className="text-neutral-500 font-light">
                  {propertyType?.description}
                </div>
              </div>
            </div>
            <hr />
            <div
              className="
        text-lg font-light text-neutral-500"
            >
              {listing.description}
            </div>
            <hr />
            <Map latlng={country?.latlng} />
          </div>

          <div className="lg:col-span-3 col-span-full order-first lg:order-last">
            <ListingReservation
              reservations={reservations}
              listing={listing}
              currentUser={currentUser}
            />
          </div>
        </div>

        <Reviews
          currentUser={currentUser}
          listingId={listing.id}
          reviews={listing.reviews}
          userId={currentUser?.id}
        />
      </div>
    </div>
  );
};

export default ListingPageClient;
