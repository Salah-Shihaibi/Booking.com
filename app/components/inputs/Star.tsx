"use client"
import { BsStarFill, BsStar } from "react-icons/bs";

interface startProps {
  limit: number;
  pos: number;
  hoverPos: number;
  updatePos: (newPos: number) => void;
  updateHoverPos: (newHoverPos: number) => void;
}

const Stars: React.FC<startProps> = ({
  limit,
  pos,
  hoverPos,
  updatePos,
  updateHoverPos,
}) => {
  return (
    <div
      onClick={() => {
        updatePos(limit);
      }}
      onMouseEnter={() => {
        updateHoverPos(limit);
      }}
      onMouseLeave={() => {
        updateHoverPos(1);
      }}
    >
      {pos >= limit || hoverPos >= limit ? (
        <BsStarFill size={30} className={`text-yellow-500`} />
      ) : (
        <BsStar size={30} className={`text-yellow-500`} />
      )}
    </div>
  );
};

export default Stars;
