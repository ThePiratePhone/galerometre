export default function useColor(
  color: "blue" | "green" | "purple" | "red",
  variant: "light" | "dark"
) {
  return `var(--${color}-${variant})`;
}
