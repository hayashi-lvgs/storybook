// src/stories/Button.tsx
import "./button.css";

export type Variant =
  | "primaryFilled"
  | "primaryOutlined"
  | "primaryGhost"
  | "alertFilled"
  | "alertOutlined"
  | "alertGhost"
  | "neutralGhost";

export type Size = "small" | "medium" | "large";
export type Width = "hug" | "fill";
export type State = "default" | "hover" | "disabled";

export type ButtonProps = {
  label: string;
  variant?: Variant;
  size?: Size;
  width?: Width;
  state?: State;
};

export function Button({
  label,
  variant = "primaryFilled",
  size = "medium",
  width = "hug",
  state = "default",
}: ButtonProps) {
  const isDisabled = state === "disabled";

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={[
        "btn",
        `btn--${variant}`,
        `btn--${size}`,
        `btn--${width}`,
        state === "hover" ? "is-hover" : "",
      ].join(" ")}
    >
      <span className="btn__label">{label}</span>
      <span className="btn__caret">▾</span>
    </button>
  );
}