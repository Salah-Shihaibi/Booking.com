"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import { useState } from "react";
import GoogleSignIn from "../../components/signup/GoogleSignIn";
import Button from "../../components/buttons/Button";
import SignIn from "../../components/signup/SignIn";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const EmailClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const email = data.email;
    setIsLoading(true);
    axios
      .get(`/api/email/${email}`)
      .then(({ data }) => {
        if (data) router.push(`/signIn/login?email=${email}`);
        else router.push(`/signIn/register?email=${email}`);
      })
      .catch((error) => {
        toast.error("Something when wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SignIn>
      <h2 className="font-semibold text-xl mb-8">
        Sign In or create an account
      </h2>
      <Input
        disabled={isLoading}
        errors={errors}
        id="email"
        label="Email address"
        register={register}
        required
        placeHolder="Enter your email address"
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        label="Continue with Email"
        disabled={isLoading}
      />
      <GoogleSignIn />
    </SignIn>
  );
};

export default EmailClient;
