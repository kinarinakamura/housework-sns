export type TimeBand = "morning" | "day" | "evening" | "night";

function getJstHour(date: Date): number {
  const jst = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    hour: "numeric",
    hour12: false,
  }).format(date);
  return Number(jst);
}

export function getTimeBand(date: Date = new Date()): TimeBand {
  const hour = getJstHour(date);
  if (hour >= 4 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "day";
  if (hour >= 17 && hour < 23) return "evening";
  return "night";
}

export const TIME_BAND_COPY: Record<
  TimeBand,
  { heading: string; placeholder: string }
> = {
  morning: {
    heading: "今日のごはん予定は？",
    placeholder: "例: 朝ごはんは味噌汁とおにぎりにした",
  },
  day: {
    heading: "今日はどんな家事してる？",
    placeholder: "例: 洗濯物をたたんだ、掃除機をかけた",
  },
  evening: {
    heading: "今日の家事、お疲れ様でした",
    placeholder: "例: 夕飯作り終わった、やっと一段落",
  },
  night: {
    heading: "今日も一日お疲れ様。ゆっくり休んでね",
    placeholder: "例: 今日は何もできなかったけどそれでいい",
  },
};
