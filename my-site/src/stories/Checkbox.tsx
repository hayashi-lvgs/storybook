// src/components/Checkbox/Checkbox.tsx
import React from "react";

type Width = "hug" | "fill";
type State = "default" | "hover" | "selected" | "error" | "disabled";

export type CheckboxProps = {
  label: string;
  width?: Width;          // fill / hug
  border?: boolean;       // border: true / false
  state?: State;          // default / hover / selected / error / disabled
  showHelp?: boolean;     // 右側の ? を表示するか
};

function getStyle(state: State, border: boolean) {
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isHover = state === "hover";
  const isSelected = state === "selected";

  // ベース
  const colors = {
    text: isDisabled ? "#9ca3af" : isError ? "#b91c1c" : "#111827",
    border: isDisabled ? "#e5e7eb" : isError ? "#ef4444" : isHover ? "#2563eb" : "#d1d5db",
    bg: isDisabled ? "#f3f4f6" : "#ffffff",
    containerBorder: border
      ? isDisabled
        ? "#e5e7eb"
        : isError
          ? "#ef4444"
          : isHover
            ? "#2563eb"
            : "#d1d5db"
      : "transparent",
    containerBg: border ? (isDisabled ? "#f9fafb" : "#ffffff") : "transparent",
    helpBg: isDisabled ? "#e5e7eb" : "#6b7280",
    helpText: "#ffffff",
    checkBg: isDisabled ? "#e5e7eb" : isSelected ? "#2563eb" : "#ffffff",
    checkBorder: isDisabled ? "#e5e7eb" : isError ? "#ef4444" : isHover ? "#2563eb" : "#9ca3af",
    checkText: isDisabled ? "#9ca3af" : "#ffffff",
  };

  return { ...colors, isSelected, isDisabled };
}

export function Checkbox({
  label,
  width = "hug",
  border = false,
  state = "default",
  showHelp = true,
}: CheckboxProps) {
  const safeState: State = state ?? "default";
  const styles = getStyle(safeState, border);

  const isFill = width === "fill";

  return (
    <div
      style={{
        width: isFill ? 360 : "fit-content",
        borderRadius: 10,
        border: `1px solid ${styles.containerBorder}`,
        background: styles.containerBg,
        padding: border ? 12 : 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        opacity: styles.isDisabled ? 0.8 : 1,
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {/* checkbox box */}
        <div
          aria-hidden
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            border: `2px solid ${styles.checkBorder}`,
            background: styles.checkBg,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
          }}
        >
          {styles.isSelected ? (
            <span style={{ color: styles.checkText, fontSize: 12, lineHeight: 1 }}>✓</span>
          ) : null}
        </div>

        {/* label */}
        <span
          style={{
            color: styles.text,
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </span>
      </div>

      {/* help icon */}
      {showHelp ? (
        <div
          aria-hidden
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: styles.helpBg,
            color: styles.helpText,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            flex: "0 0 auto",
          }}
        >
          ?
        </div>
      ) : null}
    </div>
  );
}
