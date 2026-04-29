import { useScrollReveal } from "../../utils/useScrollReveal";
import "./ScrollReveal.css";

/**
 * ScrollReveal wraps children and applies a reveal animation when they enter the viewport.
 *
 * Props:
 *  - variant: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" (default: "fadeUp")
 *  - delay: CSS delay string e.g. "200ms" (default: "0ms")
 *  - className: extra class names to forward to the wrapper div
 */
export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = "0ms",
  className = "",
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`revealWrapper reveal-${variant} ${isVisible ? "revealVisible" : ""} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
