"use client";

import Heading from "@/app/components/Heading";
import useCountries from "@/app/hooks/useCountries";
import Map from "@/app/components/Map";
import { Listing, User } from "@prisma/client";
import Image from "next/image";
import Avatar from "@/app/components/Avatar";
import { propertyTypes } from "@/app/components/navbar/PropertyFilter";

interface ListingPageClientProps {
  listing: Listing & { user: User };
  currentUser: User | null;
}

const ListingPageClient: React.FC<ListingPageClientProps> = ({
  listing,
  currentUser,
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
          <Image
            src={listing.imagesSrc[0]}
            fill
            className="object-cover w-full"
            alt="Image"
          />
        </div>

        <div className="col-span-4 flex flex-col gap-8">
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
            <Icon size={60} className="text-neutral-600" />
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{propertyType?.label}</div>
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
      </div>
    </div>
  );
};

export default ListingPageClient;
