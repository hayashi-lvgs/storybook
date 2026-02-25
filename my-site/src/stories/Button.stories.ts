// src/stories/Button.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/embed?embed_host=storybook&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FdviJlbew7NQDJr59QhMG40%2F%25F0%259F%2592%25AA%25E7%259B%25B8%25E6%25BE%25A4%25E3%2581%2595%25E3%2582%2593-%25E6%259E%2597%25E3%2583%2581%25E3%2583%25BC%25E3%2583%25A0%3Fnode-id%3D32-10411%26t%3DPfyb2aoti1pzxW7e-1",
    },
  },
  args: {
    label: "ボタンテキスト",
    variant: "primaryFilled",
    size: "medium",
    width: "hug",
    state: "default",
  },
  argTypes: {
    variant: {
      control: "select",
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
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    width: { control: "inline-radio", options: ["hug", "fill"] },
    state: { control: "inline-radio", options: ["default", "hover", "disabled"] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Alert: Story = {
  args: { variant: "alertFilled" },
};

export const Disabled: Story = {
  args: { state: "disabled" },
};