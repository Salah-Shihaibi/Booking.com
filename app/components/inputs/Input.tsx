"use client";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { IconType } from "react-icons";
interface InputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  label: string;
  required: boolean;
  disabled: boolean;
  type?: string;
  placeHolder?: string;
  rows?: number;
  icon?: IconType;
  lGap?: boolean;
}

const Input: React.FC<InputProps> = ({
  register,
  errors,
  id,
  label,
  required,
  disabled,
  type = "text",
  placeHolder = "",
  rows = 3,
  icon: Icon,
  lGap = false,
}) => {
  return (
    <>
      <label className={` ${errors[id] ? "text-red-500" : ""}`}>{label}</label>
      {type !== "textarea" ? (
        <div className="relative">
          <input
            disabled={disabled}
            type={type}
            placeholder={placeHolder}
            {...register(id, { required })}
            className={`
    disabled:opacity-70
    disabled:cursor-not-allowed    
    w-full
    p-3
    ${lGap && "pl-10"}
    mt-1
    bg-white
    rounded-md
    transition
    border
    text-lg
    ${errors[id] ? "border-red-500" : "border-zinc-400"}
    ${errors[id] ? "focus:border-red-500" : "focus:border-blue-500"}
`}
          />
          {Icon && (
            <Icon
              size={25}
              className="absolute
           top-[19px]
           left-2"
            />
          )}
        </div>
      ) : (
        <textarea
          rows={rows}
          disabled={disabled}
          placeholder={placeHolder}
          {...register(id, { required })}
          className={`
    disabled:opacity-70
    disabled:cursor-not-allowed    
    w-full
    p-4
    mt-1
    bg-white
    rounded-md
    transition
    border
    ${errors[id] ? "border-red-500" : "border-zinc-400"}
    ${errors[id] ? "focus:border-red-500" : "focus:border-blue-500"}
`}
        />
      )}
    </>
  );
};

export default Input;
