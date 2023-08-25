"use client";

interface SignInProps {
  children: React.ReactNode;
}

const SignIn: React.FC<SignInProps> = ({ children }) => {
  return (
    <div
      className="flex flex-col gap-3 w-full content-center items-center
       max-w-[2520px]
    "
    >
      <div className="w-96 py-5">
        {children}
        <hr className="mt-10 mb-2 w-full border-t border-gray-400"></hr>
        <p className="text-center text-xs text-neutral-500">
          By signing in or creating an account, you agree with our Terms &
          conditions and Privacy statement
        </p>

        <hr className="mt-6 mb-4 w-full border-t border-gray-400"></hr>
        <p className="text-center text-xs text-neutral-500">
          All rights reserved. Copyright (2006 - 2023) - Booking.com™
        </p>
      </div>
    </div>
  );
};

export default SignIn;
