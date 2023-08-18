import { useEffect, useRef } from "react";

interface IUseClickOutsideComponent {
  updateVar: any;
  action: () => void;
}
const useClickOutsideComponent = ({
  updateVar,
  action,
}: IUseClickOutsideComponent) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  function handleClickOutside(event: MouseEvent) {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      action();
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [updateVar]);

  return { divRef };
};

export default useClickOutsideComponent;
