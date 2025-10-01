export default function useColor(
  color: "blue" | "green" | "purple",
  variant: "light" | "dark"
) {
  return `var(--${color}-${variant})`;
}
