import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ottsu",
  description: "かしこまらない、主婦用SNS。匿名で家事を報告し合えるアプリ。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${zenMaruGothic.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg font-sans text-ink">{children}</body>
    </html>
  );
}
