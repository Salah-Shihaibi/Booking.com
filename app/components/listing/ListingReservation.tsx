"use client";

import { Range } from "react-date-range";
import Calendar from "@/app/components/inputs/Calendar";
import { useState, useMemo, useEffect, useCallback } from "react";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { Listing, Reservation, User } from "@prisma/client";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface ListingPageClientProps {
  reservations?: Reservation[] | null;
  listing: Listing & { user: User };
  currentUser: User | null;
}

const ReserveListing: React.FC<ListingPageClientProps> = ({
  reservations,
  listing,
  currentUser,
}) => {
  const router = useRouter();

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price, initialDateRange]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return;
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser]);

  return (
    <div
      className="bg-white 
    rounded-xl 
    border-[1px]
  border-neutral-200 
    overflow-hidden
    py-4"
    >
      <div className="px-3 text-lg">
        ${listing.price}{" "}
        <span className="font-light text-neutral-500">night</span>
      </div>
      <Calendar
        value={dateRange}
        onChange={(value) => {
          setDateRange(value.selection);
        }}
        disabledDates={disabledDates}
      />
      <div className="flex flex-row justify-center p-4">
        <Button
          disabled={isLoading}
          label="Reserve"
          onClick={onCreateReservation}
        />
      </div>
      <div
        className="
          p-4
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ReserveListing;
