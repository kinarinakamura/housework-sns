import { AVATAR_EMOJIS } from "@/lib/types";

export function AvatarPicker({
  name = "avatarEmoji",
  defaultValue = AVATAR_EMOJIS[0],
}: {
  name?: string;
  defaultValue?: string;
}) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {AVATAR_EMOJIS.map((emoji) => (
        <label key={emoji} className="relative block">
          <input
            type="radio"
            name={name}
            value={emoji}
            defaultChecked={emoji === defaultValue}
            className="peer sr-only"
          />
          <span className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-white text-xl transition-colors peer-checked:border-brand peer-checked:bg-brand-light/30 peer-focus-visible:ring-2 peer-focus-visible:ring-brand">
            {emoji}
          </span>
        </label>
      ))}
    </div>
  );
}
