"use client"
import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ImageSlideProps {
  base64Strings: string[];
}

const ImageSlide: React.FC<ImageSlideProps> = ({ base64Strings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % base64Strings.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + base64Strings.length) % base64Strings.length
    );
  };

  return (
    <div className="w-full h-full mx-auto rounded-xl">
      <div className="relative flex justify-center h-[52vh]">
        <Image
          fill
          className="object-cover w-full"
          alt={`Image ${currentIndex + 1}`}
          src={base64Strings[currentIndex]}
        />
        <div className="absolute top-1/2 left-0 right-0 flex justify-between">
          <button
            onClick={handlePrev}
            className="text-white bg-blue-700 p-2 rounded-full ml-1"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="text-white bg-blue-700 p-2 rounded-full mr-1"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlide;
