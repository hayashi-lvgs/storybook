/* ================================
   ① import（外部から読み込む）
   ================================ */

/**
 * Meta / StoryObj
 * Storybook が「これは stories ファイルだ」と理解するための型
 *
 * type import にしている理由：
 * - 実行時コードではなく「型」だけを使う
 * - JavaScriptの出力に含めないため
 */
import type { Meta, StoryObj } from "@storybook/react";

/**
 * Button
 * 表示・操作対象となる React コンポーネント本体
 */
import { Button } from "./Button";

/* ================================
   ② meta（Storybookの設計書）
   ================================ */

/**
 * meta
 * 「このファイルが扱うコンポーネントの定義」
 *
 * Storybookはまずこの meta を読む
 */
const meta = {
  /**
   * title
   * Storybook左サイドバーの表示階層
   * ※ フォルダ構造とは無関係
   */
  title: "Components/Button",

  /**
   * component
   * このstoriesが操作・表示するReactコンポーネント
   */
  component: Button,

  /**
   * parameters
   * Storybookの拡張設定
   */
  parameters: {
    /**
     * design
     * addon-designs を使って Figma / FigJam を埋め込む設定
     */
    design: {
      type: "figma",
      url: "https://www.figma.com/embed?embed_host=storybook&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FdviJlbew7NQDJr59QhMG40%2F%25F0%259F%2592%25AA%25E7%259B%25B8%25E6%25BE%25A4%25E3%2581%2595%25E3%2582%2593-%25E6%259E%2597%25E3%2583%2581%25E3%2583%25BC%25E3%2583%25A0%3Fnode-id%3D32-10411%26t%3DPfyb2aoti1pzxW7e-1",
    },
  },

  /**
   * argTypes
   * Storybookの Controls（UI操作パネル）の定義
   *
   * 「propsをどう操作できるか」を決める
   */
  argTypes: {
    variant: {
      control: "select", // プルダウン
      options: [
        "primaryFilled",
        "primaryOutlined",
        "primaryGhost",
        "alertFilled",
        "alertOutlined",
        "alertGhost",
        "neutralGhost",
      ],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    width: {
      control: "inline-radio",
      options: ["hug", "fill"],
    },
    state: {
      control: "inline-radio",
      options: ["default", "hover", "disabled"],
    },
  },

  /**
   * args
   * 全ストーリー共通の「初期値」
   *
   * ここがないと：
   * - Controlsが効かない
   * - variantを変えても反映されない
   */
  args: {
    label: "ボタンテキスト",
    variant: "primaryFilled",
    size: "medium",
    width: "hug",
    state: "default",
  },
} satisfies Meta<typeof Button>;
/**
 * satisfies Meta<typeof Button>
 * - metaの構造が Button 用として正しいかを型チェック
 * - 書き間違いをコンパイル時に検知
 */

/* ================================
   ③ meta をエクスポート
   ================================ */

/**
 * default export
 * Storybookはこの meta を自動で読み込む
 */
export default meta;

/* ================================
   ④ Story型（個別ストーリー用）
   ================================ */

/**
 * Story
 * meta を元にした「1ストーリー分の型」*/

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Alert: Story = {
  args: { variant: "alertFilled" },
};

export const Disabled: Story = {
  args: { state: "disabled" },
};
