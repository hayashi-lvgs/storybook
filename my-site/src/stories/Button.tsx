/* ================================
   ① 型定義（TypeScript）
   ================================ */

/**
 * Variant
 * ボタンの「見た目の種類」を限定するための型
 * → Figmaのvariant設計と1:1で対応させる
 */
type Variant =
  | "primaryFilled"
  | "primaryOutlined"
  | "primaryGhost"
  | "alertFilled"
  | "alertOutlined"
  | "alertGhost"
  | "neutralGhost";

/**
 * Size
 * ボタンのサイズバリエーション
 */
type Size = "small" | "medium" | "large";

/**
 * Width
 * ボタンの横幅の振る舞い
 */
type Width = "hug" | "fill";

/**
 * State
 * UI上の状態（Storybookで切り替えるため）
 */
type State = "default" | "hover" | "disabled";

/**
 * ButtonProps
 * Buttonコンポーネントが受け取る「入力の仕様書」
 *
 * export している理由：
 * - Storybook
 * - 他コンポーネント
 * から参照できるようにするため
 */
export type ButtonProps = {
  label: string;      // 表示テキスト（必須）
  variant?: Variant;  // 見た目（省略可：デフォルトあり）
  size?: Size;        // サイズ（省略可）
  width?: Width;      // 横幅（省略可）
  state?: State;      // 状態（省略可）
};

/* ================================
   ② サイズごとのスタイル定義
   ================================ */

/**
 * SIZE_STYLE
 * size → 実際の数値スタイルへの変換表
 *
 * Record<Size, ...> によって
 * - small / medium / large 以外を防ぐ
 */
const SIZE_STYLE: Record<
  Size,
  { height: number; px: number; fontSize: number }
> = {
  small: { height: 32, px: 12, fontSize: 12 },
  medium: { height: 40, px: 14, fontSize: 13 },
  large: { height: 48, px: 16, fontSize: 14 },
};

/* ================================
   ③ 色を決定するロジック
   ================================ */

/**
 * getColors
 * variant と state から
 * 実際に使う色セットを返す関数
 *
 * function を使う理由：
 * - ロジックをUIから分離するため
 * - Storybookで状態を切り替えても再利用できるため
 */
function getColors(variant: Variant, state: State) {
  const isHover = state === "hover";
  const isDisabled = state === "disabled";

  // disabled 状態は variant に関係なく固定
  if (isDisabled) {
    return {
      bg: "#e5e7eb",
      border: "#e5e7eb",
      text: "#9ca3af",
      caret: "#9ca3af",
    };
  }

  // variant ごとの分岐
  switch (variant) {
    case "primaryFilled":
      return {
        bg: isHover ? "#1d4ed8" : "#2563eb",
        border: isHover ? "#1d4ed8" : "#2563eb",
        text: "#ffffff",
        caret: "#ffffff",
      };

    case "primaryOutlined":
      return {
        bg: "#ffffff",
        border: isHover ? "#1d4ed8" : "#2563eb",
        text: isHover ? "#1d4ed8" : "#2563eb",
        caret: isHover ? "#1d4ed8" : "#2563eb",
      };

    case "primaryGhost":
      return {
        bg: "transparent",
        border: "transparent",
        text: isHover ? "#1d4ed8" : "#2563eb",
        caret: isHover ? "#1d4ed8" : "#2563eb",
      };

    case "alertFilled":
      return {
        bg: isHover ? "#991b1b" : "#b91c1c",
        border: isHover ? "#991b1b" : "#b91c1c",
        text: "#ffffff",
        caret: "#ffffff",
      };

    case "alertOutlined":
      return {
        bg: "#ffffff",
        border: isHover ? "#991b1b" : "#b91c1c",
        text: isHover ? "#991b1b" : "#b91c1c",
        caret: isHover ? "#991b1b" : "#b91c1c",
      };

    case "alertGhost":
      return {
        bg: "transparent",
        border: "transparent",
        text: isHover ? "#991b1b" : "#b91c1c",
        caret: isHover ? "#991b1b" : "#b91c1c",
      };

    case "neutralGhost":
      return {
        bg: "transparent",
        border: "transparent",
        text: isHover ? "#111827" : "#374151",
        caret: isHover ? "#111827" : "#374151",
      };
  }
}

/* ================================
   ④ Reactコンポーネント本体
   ================================ */

/**
 * Button
 * Reactの関数コンポーネント
 *
 * export する理由：
 * - Storybook
 * - 他ファイル
 * から使えるようにするため
 */
/* function 「入力を受け取り、処理をして、結果を返す箱」 */
export function Button({
  label,
  variant = "primaryFilled",
  size = "medium",
  width = "hug",
  state = "default",
}: ButtonProps) {
  // size が undefined / 想定外でも安全にする
  const safeSize: Size = SIZE_STYLE[size] ? size : "medium";

  // サイズに応じた数値を取得
  const { height, px, fontSize } = SIZE_STYLE[safeSize];

  // 色を決定
  const { bg, border, text, caret } = getColors(variant, state);

  const disabled = state === "disabled";
  const isFill = width === "fill";

  // JSX（UIの見た目）
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        height,
        padding: `0 ${px}px`,
        borderRadius: 8,
        border: `1px solid ${border}`,
        background: bg,
        color: text,
        fontSize,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        width: isFill ? 240 : "auto",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.9 : 1,
      }}
    >
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ color: caret, fontSize: 12, lineHeight: 1 }}>▾</span>
    </button>
  );
}
