export function cn(...parts) {
  return parts
    .flatMap((part) => {
      if (!part) return [];
      if (Array.isArray(part)) return part;
      return String(part).split(" ");
    })
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ");
}
