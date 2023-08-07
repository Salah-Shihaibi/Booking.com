"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../../components/inputs/Input";
import SignIn from "../../components/signup/SignIn";
import Button from "../../components/buttons/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import ClientOnly from "@/app/components/clientOnly";

const LoginClient = () => {
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
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      email,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        router.push("/");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <ClientOnly>
      <SignIn>
        <div>
          <h2 className="font-semibold text-xl mb-2">Welcome back</h2>
          <p className=" text-sm text-neutral-500 mb-5">
            Please enter your password
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
          <Button
            onClick={handleSubmit(onSubmit)}
            label="Login"
            disabled={isLoading}
          />
        </div>
      </SignIn>
    </ClientOnly>
  );
};

export default LoginClient;
