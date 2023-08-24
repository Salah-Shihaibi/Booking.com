"use client";
import { Review, User } from "@prisma/client";
import Button from "../buttons/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

interface ReviewsParams {
  currentUser: User | null;
  listingId: Number;
  reviews: (Review & { user: User })[] | null;
  userId?: number;
}

const Reviews: React.FC<ReviewsParams> = ({
  currentUser,
  listingId,
  reviews,
  userId,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<null | number>(null);
  const reviewScore = useMemo(() => {
    if (!reviews) return null;
    return (
      reviews.reduce((sum, item) => sum + item.reviewScore, 0) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const onDelete = useCallback(
    (id: number) => {
      setDeleteId(id);
      axios
        .delete(`/api/reviews/${id}`)
        .then(() => {
          toast.success("Review deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeleteId(null);
        });
    },
    [router]
  );

  if (!reviews || reviews.length === 0) {
    return (
      <div>
        <Button
          icon={IoMdAddCircleOutline}
          label="Add a review"
          width="w-[165px]"
          onClick={() => {
            router.push(`/reviews/create/${listingId}`);
          }}
        />
        <div className="pt-4 font-semibold text-xl">No reviews</div>
      </div>
    );
  }
  return (
    <div className="review">
      <div className="font-bold text-xl py-4">Guest Reviews</div>
      <div className="flex flex-row items-center gap-2 pb-6">
        <span
          className="px-2 py-1 flex
             items-center
            bg-blue-900
            text-white
             rounded-md"
        >
          {reviewScore}
        </span>{" "}
        Review Score <span>{"."}</span>
        <span className="text-neutral-500">{reviews?.length || 0} reviews</span>
      </div>

      <Button
        icon={IoMdAddCircleOutline}
        width="w-[165px]"
        label="Add a review"
        onClick={() => {
          if (!currentUser) router.push(`/signIn/email`);
          else router.push(`/reviews/create/${listingId}`);
        }}
      />
      <div className="my-4 py-4 px-2 flex flex-col gap-8 rounded-md bg-neutral-100">
        {reviews?.map((review) => (
          <div className="relative flex flex-row gap-5">
            {review.userId === userId && (
              <MdCancel
                onClick={() => {
                  onDelete(review.id);
                }}
                size={27}
                className={`absolute
       top-0.5 right-0.5
       sm:right-3
       sm:top-2
     text-blue-600
      hover:text-blue-900
      ${review.id === deleteId ? "cursor-not-allowed" : "cursor-pointer"}
      `}
              />
            )}
            <div
              className="min-w-[45px] w-[45px] min-h-[45px] h-[45px] rounded-full
             flex items-center justify-center
            text-white bg-blue-800
             text-xl font-bold mt-1"
            >
              {review.user.image ? (
                <Image
                  width="45"
                  height="45"
                  src={review.user.image}
                  alt="profile pic"
                />
              ) : (
                <div>{review.user.email[0].toUpperCase()}</div>
              )}
            </div>
            <div className="">
              <div className="font-bold">{review.user.email}</div>
              <div className="font-lights text-sm text-neutral-500">
                {formatDistanceToNow(review.createdAt, { addSuffix: true })}
              </div>
              <div
                className="flex
              items-center
              justify-center
              w-[30px]
              h-[30px]
             bg-blue-900
             text-white
              rounded-md"
              >
                {review.reviewScore}
              </div>
              <div className="font-semibold pt-1">{review.title}</div>
              <div className="">{review.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
