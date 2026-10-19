import { AVATAR_COLORS } from "@/lib/types";

// 絵文字アバターはそのまま表示し、"color:" 系は色の塗りつぶしで表示する
export function Avatar({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const gradient = AVATAR_COLORS[value];
  return (
    <span
      className={`flex flex-none items-center justify-center rounded-full ${gradient ? "" : "bg-bg-muted"} ${className}`}
      style={gradient ? { background: gradient } : undefined}
    >
      {gradient ? null : value}
    </span>
  );
}
