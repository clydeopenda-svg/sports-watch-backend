import { useState, useEffect } from "react";
import "./BackgroundRotator.css";

const defaultImages = [
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80",
];

export default function BackgroundRotator({ images = defaultImages, intervalMs = 8000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <div className="bg-rotator">
      {images.map((src, i) => (
        <div
          key={src}
          className="bg-rotator-layer"
          style={{ backgroundImage: `url(${src})`, opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div className="bg-rotator-overlay" />
    </div>
  );
}
