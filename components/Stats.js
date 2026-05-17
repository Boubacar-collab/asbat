"use client";

import { useEffect, useRef, useState } from "react";

const defaultStats = [
  { value: 250, suffix: "+", label: "Projets réalisés" },
  { value: 15, suffix: " ans", label: "D'expérience" },
  { value: 120, suffix: "+", label: "Clients satisfaits" },
  { value: 50, suffix: "+", label: "Collaborateurs" },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats({ stats = defaultStats }) {
  return (
    <section className="bg-asbat-black py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl font-bold text-asbat-green-light sm:text-5xl">
              <Counter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
