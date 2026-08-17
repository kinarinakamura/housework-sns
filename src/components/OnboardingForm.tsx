import { startSession } from "@/app/actions";
import { AvatarPicker } from "@/components/AvatarPicker";

export function OnboardingForm() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-4">
      <div className="w-full text-center">
        <h1 className="text-3xl font-black tracking-tight text-ink">
          しゅふよう
        </h1>
        <p className="mt-2 text-ink-soft">
          かしこまらない、主婦用SNS。
          <br />
          本名も顔写真もいりません。
        </p>
      </div>

      <form action={startSession} className="mt-8 w-full space-y-5 text-left">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-ink-soft"
            htmlFor="nickname"
          >
            ニックネーム
          </label>
          <input
            id="nickname"
            type="text"
            name="nickname"
            maxLength={20}
            placeholder="例: くまこ"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-[15px] text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div>
          <span className="mb-1 block text-sm font-medium text-ink-soft">
            アバター
          </span>
          <AvatarPicker />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-5 py-3 text-base font-bold text-white transition-colors hover:bg-brand-dark"
        >
          はじめる
        </button>
        <p className="text-center text-xs text-ink-faint">
          位置情報や個人を特定できる情報は取得しません
        </p>
      </form>
    </div>
  );
}
