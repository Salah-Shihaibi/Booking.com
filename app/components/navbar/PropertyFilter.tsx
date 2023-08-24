"use client";
import qs from "query-string";
import { useState, useCallback } from "react";
import ServiceButton from "../buttons/PropertyFilterButton";
import { useRouter, useSearchParams } from "next/navigation";
import { propertyTypes } from "@/app/data/propertyTypes";

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
    [params, router]
  );

  return (
    <div
      className="px-5 pb-4 mr-7 flex
     flex-row gap-3 items-center
     xl:justify-center overflow-scroll z-50"
    >
      {propertyTypes.map((s) => (
        <ServiceButton
          key={s.label}
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
