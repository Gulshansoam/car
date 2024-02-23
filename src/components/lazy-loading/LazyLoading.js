import { useEffect, useState, useRef } from "react";

function useLazyLoadComponent(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: threshold,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [threshold]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  };

  return { isVisible, componentRef };
}

export default useLazyLoadComponent;
