import { CircleNotch } from "@phosphor-icons/react";

function Loading({
  size,
  type,
}: {
  size: "small" | "large" | "medium";
  type: "screen" | "full" | "self";
}) {
  return (
    <div
      className={`text-primary ${size === "small" && "text-lg"} ${
        size === "medium" && "text-2xl"
      } ${size === "large" && "text-5xl"} ${
        type === "screen" && "flex h-screen w-full items-center justify-center"
      } ${
        type === "full" && "flex h-full w-full items-center justify-center"
      } ${type === "self" && "inline text-tertiary-base"} `}
    >
      <CircleNotch className="animate-spin" />
    </div>
  );
}

export default Loading;
