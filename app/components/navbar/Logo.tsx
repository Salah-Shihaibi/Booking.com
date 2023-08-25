"use client"
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        window.location.href = "/";
      }}
      className=" pl-2 text-white font-semibold text-xl cursor-pointer"
    >
      Booking.com
    </div>
  );
};

export default Logo;
