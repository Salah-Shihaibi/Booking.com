"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "../../components/inputs/Input";
import SignIn from "../../components/signup/SignIn";
import Button from "../../components/buttons/Button";
import { useRouter, useSearchParams } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";

const RegisterClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const email = useSearchParams()?.get("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", { ...data, email })
      .then(() => {
        toast.success("Registered successfully! You can now login");
        router.push(`/signIn/email`);
      })
      .catch((error) => {
        toast.error("Something when wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ClientOnly>
      <SignIn>
        <div>
          <h2 className="font-semibold text-xl mb-2">Create Password</h2>
          <p className=" text-sm text-neutral-500 mb-8">
            Use a minimum of 10 characters, including uppercase letters,
            lowercase letters and numbers.
          </p>
          <Input
            disabled={isLoading}
            errors={errors}
            id="password"
            label="Password"
            register={register}
            type="password"
            required
          />
          <div className="mb-5" />
          <Input
            disabled={isLoading}
            errors={errors}
            id="confirmPassword"
            label="Confirm Password"
            register={register}
            type="password"
            required
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            label="Create account"
            disabled={isLoading}
          />
        </div>
      </SignIn>
    </ClientOnly>
  );
};

export default RegisterClient;
