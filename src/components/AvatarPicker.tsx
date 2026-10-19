import { Avatar } from "@/components/Avatar";
import { AVATAR_EMOJIS } from "@/lib/types";

export function AvatarPicker({
  name = "avatarEmoji",
  defaultValue = AVATAR_EMOJIS[0],
}: {
  name?: string;
  defaultValue?: string;
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {AVATAR_EMOJIS.map((emoji) => (
        <label key={emoji} className="relative block">
          <input
            type="radio"
            name={name}
            value={emoji}
            defaultChecked={emoji === defaultValue}
            className="peer sr-only"
          />
          <Avatar
            value={emoji}
            className="h-11 w-11 cursor-pointer border-2 border-transparent text-3xl transition-colors peer-checked:border-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand"
          />
        </label>
      ))}
    </div>
  );
}
