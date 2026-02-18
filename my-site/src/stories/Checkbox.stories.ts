// src/stories/Checkbox.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../components/Checkbox/Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    width: { control: "inline-radio", options: ["hug", "fill"] },
    border: { control: "boolean" },
    state: {
      control: "inline-radio",
      options: ["default", "hover", "selected", "error", "disabled"],
    },
    showHelp: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "選択肢選択肢選択肢",
    width: "hug",
    border: false,
    state: "default",
    showHelp: true,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = { args: { state: "default" } };
export const Hover: Story = { args: { state: "hover" } };
export const Selected: Story = { args: { state: "selected" } };
export const Error: Story = { args: { state: "error" } };
export const Disabled: Story = { args: { state: "disabled" } };

export const BorderTrue: Story = { args: { border: true } };
export const Fill: Story = { args: { width: "fill" } };
