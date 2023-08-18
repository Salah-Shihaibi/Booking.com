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

const removeNav = [
  "/signIn/email",
  "/signIn/login",
  "/signIn/register",
  "/listings/create",
  "/listings/*",
];

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const pathname = usePathname();

  const pathMatchesPattern = useMemo(() => {
    const currentPathSegments = pathname?.split("/");
    for (const path of removeNav) {
      const pathSegments = path.split("/");

      if (pathSegments.length !== currentPathSegments?.length) {
        continue;
      }

      for (let i = 0; i < pathSegments.length; i++) {
        if (
          currentPathSegments[i] !== "*" &&
          currentPathSegments[i] !== pathSegments[i]
        ) {
          continue;
        }
      }

      return true;
    }
    return false;
  }, [pathname]);

  return (
    <nav className=" bg-blue-800">
      <div
        className="flex flex-row 
      justify-between 
      py-2
      px-2
      items-center
      "
      >
        <Logo />
        {!pathMatchesPattern && (
          <>
            <PcMenu currentUser={currentUser} />
            <MobileMenu currentUser={currentUser} />
          </>
        )}
      </div>
      {!pathMatchesPattern && <ServiceRoutes />}
    </nav>
  );
};

export default Navbar;
