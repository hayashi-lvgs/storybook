import React from "react";
import "./checkbox.css";

export type CheckboxState = "default" | "hover" | "selected" | "error" | "disabled";
export type CheckboxWidth = "hug" | "fill";

export type CheckboxProps = {
  label: string;
  width?: CheckboxWidth;      // "hug" | "fill"
  border?: boolean;           // 囲み枠の有無
  state?: CheckboxState;      // 見た目状態
  showHelp?: boolean;         // ? アイコン表示
  helpAriaLabel?: string;     // アクセシビリティ用
  onHelpClick?: () => void;

  /**
   * 運用で実際にフォーム部品として使うための拡張
   * Storybook上は state が優先されるようにしてる
   */
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  width = "hug",
  border = false,
  state = "default",
  showHelp = true,
  helpAriaLabel = "ヘルプ",
  onHelpClick,

  checked,
  disabled,
  name,
  value,
  onChange,
}) => {
  const isSelected = state === "selected";
  const isDisabled = state === "disabled" || disabled === true;
  const isError = state === "error";

  // state で見た目を固定したいので、checked/disabled は state が指定されてたらそっちを優先
  const resolvedChecked = typeof checked === "boolean" ? checked : isSelected;
  const resolvedDisabled = isDisabled;

  return (
    <div
      className="c-checkbox"
      data-width={width}
      data-border={border ? "true" : "false"}
      data-state={state}
      aria-invalid={isError ? "true" : "false"}
    >
      <label className="c-checkbox__label">
        <input
          className="c-checkbox__input"
          type="checkbox"
          name={name}
          value={value}
          checked={resolvedChecked}
          disabled={resolvedDisabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />

        <span className="c-checkbox__box" aria-hidden="true">
          <svg
            className="c-checkbox__check"
            viewBox="0 0 16 16"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M6.6 11.2 3.7 8.4 2.6 9.5l4 4 7-7-1.1-1.1-5.9 5.8z" />
          </svg>
        </span>

        <span className="c-checkbox__text">{label}</span>
      </label>

      {showHelp && (
        <button
          type="button"
          className="c-checkbox__help"
          aria-label={helpAriaLabel}
          onClick={onHelpClick}
          disabled={resolvedDisabled}
        >
          ?
        </button>
      )}
    </div>
  );
};
