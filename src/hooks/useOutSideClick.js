import { useEffect } from "react";

export default function useOutSideClick(ref, exceptionId, cbFuction) {
  useEffect(() => {
    function handelOutSideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      ) {
        cbFuction();
      }
    }
    document.addEventListener("mousedown", handelOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handelOutSideClick);
    };
  }, [ref, cbFuction]);
}
