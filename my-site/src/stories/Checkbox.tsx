// src/stories/Checkbox.tsx
import "./checkbox.css";

export type CheckboxState = "default" | "hover" | "selected" | "error" | "disabled";
export type CheckboxWidth = "hug" | "fill";

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  width?: CheckboxWidth;
  state?: CheckboxState;
  border?: boolean;
};

export function Checkbox({
  label,
  checked,
  onChange,
  width = "hug",
  state = "default",
  border = false,
}: CheckboxProps) {
  const isDisabled = state === "disabled";

  return (
    <label
      className={[
        "cb",
        `cb--${width}`,
        border ? "cb--border" : "",
        isDisabled ? "is-disabled" : "",
        state === "error" ? "is-error" : "",
      ].join(" ")}
    >
      <input
        className="cb__input"
        type="checkbox"
        checked={checked}
        disabled={isDisabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="cb__box" aria-hidden="true">
        {checked ? "✓" : ""}
      </span>
      <span className="cb__label">{label}</span>
      <span className="cb__help" aria-hidden="true">
        ?
      </span>
    </label>
  );
}