import { RefObject, useEffect } from "react";

type UseHandleClickOutsideProps = {
  ref: RefObject<HTMLElement>;
  callback: () => void;
};

export const useHandleClickOutside = ({
  ref,
  callback,
}: UseHandleClickOutsideProps) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
};
