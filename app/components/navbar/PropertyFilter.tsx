"use client";
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
  const [selectedRoute, setSelectedRoute] = useState("Stays");
  const switchRoute = useCallback((routeName: string) => {
    setSelectedRoute(routeName);
  }, []);

  return (
    <div className="px-5 py-5 mr-7 flex flex-row gap-3 items-center overflow-auto">
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
