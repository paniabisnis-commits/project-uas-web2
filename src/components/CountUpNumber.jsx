import { useEffect, useRef, useState } from "react";

export default function CountUpNumber({ target, duration = 1200 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const increment = Math.ceil(target / (duration / 16));

          const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
              setValue(target);
              clearInterval(counter);
            } else {
              setValue(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 } // 30% terlihat
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target, duration]);

  return <h3 ref={ref} style={{ fontSize: "28px", fontWeight: "bold", color: "#0f766e" }}>{value}</h3>;
}
