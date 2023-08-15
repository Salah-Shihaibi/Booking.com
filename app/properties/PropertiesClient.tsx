"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listing/ListingCard";
import { Listing, User } from "@prisma/client";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const onDelete = useCallback(
    (id: number) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId(null);
        });
    },
    [router]
  );

  return (
    <>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-4
        max-w-[2520px]
        mt-4
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
            price={true}
          />
        ))}
      </div>
    </>
  );
};

export default PropertiesClient;
