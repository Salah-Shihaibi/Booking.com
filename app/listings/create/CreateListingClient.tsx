"use client";
import Heading from "@/app/components/Heading";
import PropertyButton from "@/app/components/buttons/PropertyButton";
import { propertyTypes } from "@/app/components/navbar/PropertyFilter";
import { useState, useMemo } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Map from "@/app/components/Map";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import Counter from "@/app/components/inputs/Counter";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import { BiDollar } from "react-icons/bi";
import { AiOutlineLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const CreateListingClient = () => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const checkStep = useMemo(() => {
    if (step < 5) return "Next";
    return "Submit";
  }, [step]);

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imagesSrc: [],
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imagesSrc = watch("imagesSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const checkForm = () => {
    if (getValues("category") === "" && step === STEPS.CATEGORY) {
      toast.error("Please provide a category");
      return false;
    } else if (getValues("location") === null && step === STEPS.LOCATION) {
      toast.error("Please provide a location");
      return false;
    } else if (getValues("imagesSrc").length === 0 && step === STEPS.IMAGES) {
      toast.error("Please provide photos of the place");
      return false;
    }
    return true;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created");
        reset();
        setStep(STEPS.CATEGORY);
        router.push("/");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const submitForm = () => {
    if (!checkForm()) return;
    return handleSubmit(onSubmit)();
  };

  let body = (
    <>
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
            overflow-y-auto
            max-h-[53vh]
            grid
        grid-cols-1
        md:grid-cols-2
        gap-3"
      >
        {propertyTypes.map((item) => (
          <PropertyButton
            onClick={(category) => setCustomValue("category", category)}
            key={item.label}
            label={item.label}
            selected={item.label === category}
            icon={item.icon}
          />
        ))}
      </div>
    </>
  );

  if (step === STEPS.LOCATION) {
    body = (
      <div>
        <Heading
          title="Where is your place located"
          subtitle="Help guests find you!"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map latlng={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <div
        className="
        flex flex-col gap-10 h-[65vh] overflow-y-auto"
      >
        <div>
          <Heading
            title="Add some basics about your place"
            subtitle="What amenities do you have?"
          />
        </div>
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    body = (
      <div className="flex flex-col gap-5 h-[65vh]">
        <Heading
          title="Add photos of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => {
            setCustomValue("imagesSrc", value);
          }}
          value={imagesSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className="flex flex-col gap-2 h-[65vh]">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <span className="mb-10" />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <span className="my-2" />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="textarea"
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    body = (
      <div className="flex flex-col gap-2 h-[65vh]">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <span className="mb-10" />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
          icon={BiDollar}
          lGap={true}
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-row 
    justify-center
    px-3
    max-w-[2520px]
    "
    >
      <div
        className="w-full
                    sm:w-5/6
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    flex
                    flex-col
                    gap-8"
      >
        {body}
        <div
          className="flex flex-row 
        justify-center gap-1 w-full"
        >
          {step !== STEPS.CATEGORY && (
            <button
              onClick={onBack}
              className="border px-3
           border-blue-500
           text-blue-500
           w-[10%]
           hover:bg-blue-800
           hover:text-white
           flex justify-center
           items-center
           "
            >
              <AiOutlineLeft size={20} />
            </button>
          )}
          <button
            onClick={submitForm}
            className="bg-blue-600
           w-[90%]
            p-2
            text-white
            text-lg
            hover:bg-blue-800
             "
          >
            {checkStep === "Next" ? "Continue" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListingClient;
