"use client";
import { User } from "@prisma/client";
import ServiceRoutes from "./PropertyFilter";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import PcMenu from "./PcMenu";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const pathname = usePathname();

  return (
    <nav className=" bg-blue-800">
      <div
        className={`flex flex-row 
      justify-between 
      px-2
      items-center
      py-2
      `}
      >
        <Logo />
        <>
          <PcMenu currentUser={currentUser} />
          <MobileMenu currentUser={currentUser} />
        </>
      </div>
      {pathname === "/" && <ServiceRoutes />}
    </nav>
  );
};

export default Navbar;
