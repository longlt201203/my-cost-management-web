import { Tag, TagProps } from "antd";

const colorPresets = [
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
];

function getRandomColor() {
  return colorPresets[Math.floor(Math.random() * colorPresets.length)];
}

export default function RandomColorTag(props: TagProps) {
  return <Tag {...props} color={getRandomColor()} />;
}
