"use client";
import qs from "query-string";
import { formatISO } from "date-fns";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import Button from "../buttons/Button";
import { SlCalender } from "react-icons/sl";
import { GoPerson } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import { useCallback, useState } from "react";
import useClickOutsideComponent from "@/app/hooks/useClickOutsideComponent";
import useCountries from "@/app/hooks/useCountries";
import { AiOutlineClose } from "react-icons/ai";

enum OPTIONS {
  QUIT = 0,
  LOCATION = 1,
  DATE = 2,
  INFO = 3,
}

function getLeftMargin(option: OPTIONS) {
  switch (option) {
    case OPTIONS.QUIT:
      return "left-0";
    case OPTIONS.LOCATION:
      return "left-[0%]";
    case OPTIONS.DATE:
      return "left-[27%]";
    case OPTIONS.INFO:
      return "left-[54%]";
    default:
      return "left-0";
  }
}

const getDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const SearchBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { getAll, getByValue } = useCountries();
  const params = useSearchParams();

  const locationValue = getByValue(params?.get("location") || "");

  const startDateValue = params?.get("startDate");
  const endDateValue = params?.get("endDate");

  const initialDateRange = {
    startDate: startDateValue ? new Date(startDateValue) : undefined,
    endDate: endDateValue ? new Date(endDateValue) : undefined,
    key: "selection",
  };

  const guestCountValue = Number(params?.get("guestCount") || 1);
  const roomCountValue = Number(params?.get("roomCount") || 1);
  const bathRoomCountValue = Number(params?.get("bathRoomCount") || 1);

  const [options, setOptions] = useState(OPTIONS.QUIT);
  const [locationFilter, setLocationFilter] = useState("");

  const [location, setLocation] = useState(locationValue);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [guestCount, setGuestcount] = useState(guestCountValue);
  const [roomCount, setRoomCount] = useState(roomCountValue);
  const [bathRoomCount, setBathRoomCount] = useState(bathRoomCountValue);

  const intializeDate = useCallback(() => {
    if (!dateRange.startDate) {
      setDateRange({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      });
    }
  }, [dateRange]);

  const removeSearch = useCallback(() => {
    if (options !== OPTIONS.QUIT) setOptions(OPTIONS.QUIT);
  }, [options]);

  const { divRef } = useClickOutsideComponent({
    updateVar: options,
    action: removeSearch,
  });

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      guestCount,
      roomCount,
      bathRoomCount,
    };

    if (location?.value) updatedQuery.location = location.value;

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setOptions(OPTIONS.QUIT);
    router.push(url);
  }, [
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    bathRoomCount,
    params,
  ]);

  if (pathname !== "/") {
    return <></>;
  }

  let body = <></>;
  if (options === OPTIONS.LOCATION) {
    body = (
      <>
        <div className="md:hidden relative w-full">
          <input
            placeholder="Where are you going?"
            className={`w-full p-4 bg-white
                 rounded-md transition pl-10
                 border placeholder-neutral-800`}
            value={
              location
                ? location.label + ", " + location.region
                : locationFilter
            }
            onChange={(e) => {
              setLocation(undefined);
              setLocationFilter(e.target.value);
            }}
          />
          <CiLocationOn
            size={25}
            className="absolute
              top-[16px]
              left-2"
          />
          <button
            onClick={() => {
              setLocationFilter("");
            }}
            className="absolute
              top-[16px]
              right-2
              text-blue-600"
          >
            clear
          </button>
        </div>
        <div
          className="flex flex-col overflow-auto max-h-[65vh]
      min-h-[7vh] min-w-[40vh]"
        >
          {getAll()
            .filter((option) => {
              return (
                option.label
                  .toLowerCase()
                  .startsWith(locationFilter.toLowerCase()) ||
                locationFilter === ""
              );
            })
            .map((option) => (
              <div
                key={option.label}
                onClick={() => {
                  setLocation(option);
                  intializeDate();
                  setOptions(OPTIONS.DATE);
                }}
                className="flex flex-row 
          items-center 
          gap-3 z-50
          cursor-pointer
          hover:bg-neutral-200
          p-4
          "
              >
                <div>{option.flag}</div>
                <div>
                  {option.label},
                  <span className="text-neutral-500 ml-1">{option.region}</span>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  } else if (options === OPTIONS.DATE) {
    body = (
      <div className="flex flex-col gap-10 h-full md:min-w-[60vh] p-1">
        <Calendar
          value={dateRange}
          onChange={(value) => {
            setDateRange(value.selection);
          }}
        />
        <div className="md:hidden">
          <Button
            label="Done"
            onClick={() => {
              setOptions(OPTIONS.QUIT);
            }}
          />
        </div>
      </div>
    );
  } else if (options === OPTIONS.INFO) {
    body = (
      <div className="flex flex-col gap-10 p-1 h-full">
        <div
          className="
    flex flex-col justify-center gap-10 overflow-y-auto px-4 py-6"
        >
          <Counter
            title="Guests"
            subtitle=""
            value={guestCount}
            onChange={(value) => setGuestcount(value)}
          />
          <hr />
          <Counter
            title="Rooms"
            subtitle=""
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
          />
          <hr />
          <Counter
            title="Bathrooms"
            subtitle=""
            value={bathRoomCount}
            onChange={(value) => setBathRoomCount(value)}
          />
        </div>
        <div className="md:hidden">
          <Button
            label="Done"
            onClick={() => {
              setOptions(OPTIONS.QUIT);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className=" ">
      <div
        className="
      block lg:flex justify-center
      bg-gradient-to-b from-blue-800 via-blue-600 to-white
      px-2 md:px-10 lg:px-12 py-5 md:py-1"
      >
        <div
          className="
          flex flex-col md:flex-row bg-yellow-500
          rounded-lg
          p-1 gap-1 w-full max-w-[1600px]"
        >
          <div
            onClick={() => {
              setOptions(OPTIONS.LOCATION);
            }}
            className="md:w-[29%] 
            bg-white px-2 
             py-2 md:py-1 md:px-1
            rounded-md flex
            flex-row items-center
            gap-2 text-neutral-800
            cursor-pointer"
          >
            <div className="relative w-full">
              <input
                placeholder="Where are you going?"
                className={`w-full p-2 bg-white
                 rounded-md transition pl-8
                 border placeholder-neutral-800`}
                value={
                  location
                    ? location.label + ", " + location.region
                    : locationFilter
                }
                onChange={(e) => {
                  setLocation(undefined);
                  setLocationFilter(e.target.value);
                }}
              />
              <CiLocationOn
                size={25}
                className="absolute
              top-[8px]
              left-2"
              />
            </div>
          </div>

          <div
            onClick={() => {
              intializeDate();
              setOptions(OPTIONS.DATE);
            }}
            className="md:w-[29%]
         bg-white 
           md:py-2 md:px-4  p-4
           rounded-md flex 
           flex-row items-center
           gap-2 text-neutral-800
           cursor-pointer"
          >
            <SlCalender size={22} />
            <div className="truncate overflow-hidden">
              {dateRange.startDate
                ? getDate(dateRange.startDate)
                : "Check-in date"}{" "}
              —{" "}
              {dateRange.endDate
                ? getDate(dateRange.endDate)
                : "Check-out date"}
            </div>
          </div>
          <div
            onClick={() => {
              setOptions(OPTIONS.INFO);
            }}
            className="md:w-[29%]
         bg-white
           md:py-2 md:px-4  p-4
           rounded-md flex 
           flex-row items-center
           gap-2 text-neutral-800
           cursor-pointer"
          >
            <GoPerson size={28} />
            <div className="truncate overflow-hidden">
              {guestCount} People - {roomCount} Room - {bathRoomCount} Bathroom
            </div>
          </div>
          <Button
            width="md:w-[12%]"
            label="Search"
            onClick={() => {
              onSubmit();
            }}
          />
        </div>
      </div>

      {options !== OPTIONS.QUIT && (
        <div
          ref={divRef}
          className={`    
      md:mx-10
      lg:mx-12    
      border-2    
      absolute 
      
      md:top-[182px]
      ${getLeftMargin(options)}
      max-md:left-0
      max-md:top-10

      max-md:rounded-t-xl
      w-screen
      h-screen
    bg-white z-50
      md:shadow-md 
      md:w-auto
      md:h-auto
      md:rounded`}
        >
          <div
            onClick={() => {
              setOptions(OPTIONS.QUIT);
            }}
            className="md:hidden flex flex-row
         justify-end cursor-pointer
         border-b-[1px]"
          >
            <button
              className="p-4
          hover:bg-neutral-100 
            border-0
            hover:opacity-70

        "
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          <div className="h-full">{body}</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
