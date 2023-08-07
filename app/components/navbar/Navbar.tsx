"use client";
import { User } from "@prisma/client";
import ServiceRoutes from "./PropertyFilter";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import PcMenu from "./PcMenu";
import { usePathname } from "next/navigation";

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const removeNav = [
    "/signIn/email",
    "/signIn/login",
    "/signIn/register",
    "/listings/create",
  ];
  return (
    <nav className=" bg-blue-800">
      <div
        className="flex flex-row 
      justify-between 
      pt-4
      px-1
      pb-4
      items-center
      "
      >
        <Logo />
        {!removeNav.includes(pathname || "null") && (
          <>
            <PcMenu currentUser={currentUser} />
            <MobileMenu currentUser={currentUser} />
          </>
        )}
      </div>
      {!removeNav.includes(pathname || "null") && <ServiceRoutes />}
    </nav>
  );
};

export default Navbar;
