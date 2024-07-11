import { useState, useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = () => {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [ref]);

  return [ref, width];
};

export default useResizeObserver;
