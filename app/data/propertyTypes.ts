import {
  MdBeachAccess,
  MdBusiness,
  MdApartment,
  MdHotel,
  MdHome,
  MdSpa,
  MdLandscape,
  MdVilla,
} from "react-icons/md";
import { GiAncientColumns } from "react-icons/gi";
import { TbBuildingCottage } from "react-icons/tb";

export const propertyTypes = [
  {
    label: "Beach",
    icon: MdBeachAccess,
    description: "This property is close to the beach!",
  },
  {
    label: "Apartment",
    icon: MdApartment,
    description: "Modern apartment with all the amenities you need.",
  },
  {
    label: "Home",
    icon: MdHome,
    description: "Warm and inviting home for ultimate relaxation.",
  },
  {
    label: "Hotel",
    icon: MdHotel,
    description: "Enjoy a comfortable stay at this hotel property.",
  },
  {
    label: "Historic",
    icon: GiAncientColumns,
    description: "Experience the charm of a historic building.",
  },
  {
    label: "Cottage",
    icon: TbBuildingCottage,
    description: "Quaint and cozy cottage for a peaceful stay.",
  },
  {
    label: "Villa",
    icon: MdVilla,
    description: "Luxurious villa offering a lavish retreat.",
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
    label: "Spa Retreat",
    icon: MdSpa,
    description: "Indulge in relaxation and rejuvenation at this spa property.",
  },
];
