"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import { Reservation, User } from "@prisma/client";
import ListingCard from "../components/listing/ListingCard";

interface TripsClientProps {
  reservations: Reservation[];
  currentUser?: User | null | undefined;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const onCancel = useCallback(
    (id: number) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
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
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
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
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            currentUser={currentUser}
            onCancel={onCancel}
            reservation={reservation}
            disabled={deletingId === reservation.id}
            actionId={reservation.id}
            cancelLabel="Cancel reservation"
          />
        ))}
      </div>
    </>
  );
};

export default TripsClient;
