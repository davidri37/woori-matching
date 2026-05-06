import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "상상우리 — 시니어 일자리 매칭",
  description: "시니어와 일자리를 자동으로 연결합니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-blue-700 text-white shadow">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold tracking-tight">
              상상우리
            </a>
            <nav className="flex gap-6 text-lg font-medium">
              <a href="/register" className="hover:underline">
                프로필 등록
              </a>
              <a href="/recommendations" className="hover:underline">
                추천 목록
              </a>
              <a href="/admin" className="hover:underline">
                담당자 대시보드
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
