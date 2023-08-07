"use client";
import { TbPhotoPlus } from "react-icons/tb";
import { useRef } from "react";
import ImageSlide from "../ImageSlide";
import { IoMdClose } from "react-icons/io";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newUploadedImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64 = reader.result as string;
          newUploadedImages.push(base64);

          if (newUploadedImages.length === files.length) {
            onChange(newUploadedImages);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div>
      {value.length ? (
        <>
          <button
            onClick={() => {
              onChange([]);
            }}
            className="
                p-1
                border-0
                hover:opacity-70
                tarnstion
                "
          >
            <IoMdClose size={18} />
          </button>
          <ImageSlide base64Strings={value} />
        </>
      ) : (
        <div
          className="
          relative
          cursor-pointer
          hover:opacity-70
          transition
          border-dashed
          border-2
          p-20
          border-neutral-300
          flex
          flex-col
          justify-center
          items-center
          gap-3
          text-neutral-600
        "
          onClick={handleButtonClick}
        >
          <input
            type="file"
            onChange={handleUpload}
            ref={inputRef}
            className="absolute top-0 left-0 opacity-0 w-0 h-0"
            multiple
          />
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
