import { useEffect, useRef } from "react";
import "./CustomCursor.css";

// Only ambient glow blob that lazily follows cursor — no cursor override
export default function CustomCursor() {
  const cursorBlobRef = useRef(null);

  useEffect(() => {
    const blob = cursorBlobRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      blobX = lerp(blobX, mouseX, 0.055);
      blobY = lerp(blobY, mouseY, 0.055);
      blob.style.transform = `translate(${blobX - 220}px, ${blobY - 220}px)`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursorBlob" ref={cursorBlobRef} />;
}
