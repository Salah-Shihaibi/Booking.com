"use client";
import qs from "query-string";
import { useState, useCallback } from "react";
import { GiWindmill } from "react-icons/gi";
import {
  MdBeachAccess,
  MdBusiness,
  MdLandscape,
  MdApartment,
  MdHome,
  MdHotel,
  MdLocalCafe,
  MdSpa,
} from "react-icons/md";
import ServiceButton from "../buttons/PropertyFilterButton";
import { useRouter, useSearchParams } from "next/navigation";

export const propertyTypes = [
  {
    label: "Beach",
    icon: MdBeachAccess,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Business",
    icon: MdBusiness,
    description: "Perfect for business activities and meetings.",
  },
  {
    label: "Scenic Views",
    icon: MdLandscape,
    description: "Enjoy breathtaking scenic views from this property.",
  },
  {
    label: "Apartment",
    icon: MdApartment,
    description: "Modern apartment with all the amenities you need.",
  },
  {
    label: "Cozy Home",
    icon: MdHome,
    description: "A cozy home that provides comfort and relaxation.",
  },
  {
    label: "Luxury Hotel",
    icon: MdHotel,
    description: "Experience luxury and elegance at this hotel property.",
  },
  {
    label: "Café Nearby",
    icon: MdLocalCafe,
    description: "Surrounded by charming cafés and eateries.",
  },
  {
    label: "Spa Retreat",
    icon: MdSpa,
    description: "Indulge in relaxation and rejuvenation at this spa property.",
  },
];

const ServiceRoutes = () => {
  const router = useRouter();
  const params = useSearchParams();
  const route = params?.get("category") || "Stays";
  const [selectedRoute, setSelectedRoute] = useState(route);
  const switchRoute = useCallback(
    (routeName: string) => {
      setSelectedRoute(routeName);
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        category: routeName,
      };
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );
      router.push(url);
    },
    [params, selectedRoute]
  );

  return (
    <div
      className="px-5 pb-4 mr-7 flex
     flex-row gap-3 items-center
     xl:justify-center overflow-scroll z-50"
    >
      {propertyTypes.map((s) => (
        <ServiceButton
          label={s.label}
          selectedRoute={selectedRoute}
          switchRoute={switchRoute}
          Icon={s.icon}
        ></ServiceButton>
      ))}
    </div>
  );
};

export default ServiceRoutes;
