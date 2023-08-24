"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/buttons/Button";
import Heading from "@/app/components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Stars from "@/app/components/inputs/Star";

interface CreateReviewParam {
  listingId: number;
}

const CreateReview: React.FC<CreateReviewParam> = ({ listingId }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [pos, setPos] = useState(1);
  const [hoverPos, setHoverPos] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const updatePos = useCallback(
    (newPos: number) => {
      setPos(newPos);
    },
    [pos]
  );

  const updateHoverPos = useCallback(
    (newHoverPos: number) => {
      setHoverPos(newHoverPos);
    },
    [pos]
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    data.listingId = listingId;
    data.reviewScore = pos;
    axios
      .post("/api/reviews", data)
      .then(() => {
        toast.success("Review added");
        router.push(`/listings/${listingId}#review`);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-8 w-full max-w-xl">
        <Heading title="Add a review" subtitle="How has your stay been?" />
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div>Review score:</div>
              <div className="flex flex-row gap-1">
                <Stars
                  limit={1}
                  pos={pos}
                  hoverPos={hoverPos}
                  updatePos={updatePos}
                  updateHoverPos={updateHoverPos}
                />
                <Stars
                  limit={2}
                  pos={pos}
                  hoverPos={hoverPos}
                  updatePos={updatePos}
                  updateHoverPos={updateHoverPos}
                />
                <Stars
                  limit={3}
                  pos={pos}
                  hoverPos={hoverPos}
                  updatePos={updatePos}
                  updateHoverPos={updateHoverPos}
                />
                <Stars
                  limit={4}
                  pos={pos}
                  hoverPos={hoverPos}
                  updatePos={updatePos}
                  updateHoverPos={updateHoverPos}
                />
                <Stars
                  limit={5}
                  pos={pos}
                  hoverPos={hoverPos}
                  updatePos={updatePos}
                  updateHoverPos={updateHoverPos}
                />
              </div>
            </div>
            <Input
              label="Title"
              register={register}
              errors={errors}
              id="title"
              required={true}
              placeHolder="Add a title"
              disabled={isLoading}
            />
            <Input
              type="textarea"
              label="Description"
              register={register}
              errors={errors}
              id="description"
              required={true}
              placeHolder="Add a description"
              disabled={isLoading}
              rows={2}
            />
          </div>
          <Button onClick={handleSubmit(onSubmit)} label="Submit your review" />
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
