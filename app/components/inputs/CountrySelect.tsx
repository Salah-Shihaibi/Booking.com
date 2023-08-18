"use client";

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
  style?: string;
  placeholder?: string;
}
const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  style = "p-3 border-2 my-5",
  placeholder = "Anywhere",
}) => {
  const { getAll } = useCountries();

  return (
    <div className="w-full cursor-pointer">
      <Select
        placeholder={placeholder}
        isClearable
        options={getAll()}
        value={value}
        onChange={(value: CountrySelectValue) => onChange(value)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3 z-50">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => style,
        }}
      />
    </div>
  );
};

export default CountrySelect;
