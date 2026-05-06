import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">상상우리</h1>
      <p className="text-2xl text-gray-600 mb-12">
        시니어와 일자리를 자동으로 연결하는 매칭 시스템
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-5 rounded-xl shadow transition"
        >
          프로필 등록하기
        </Link>
        <Link
          href="/recommendations"
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-semibold px-10 py-5 rounded-xl shadow transition"
        >
          매칭 추천 보기
        </Link>
        <Link
          href="/admin"
          className="bg-gray-700 hover:bg-gray-800 text-white text-xl font-semibold px-10 py-5 rounded-xl shadow transition"
        >
          담당자 대시보드
        </Link>
      </div>
    </div>
  );
}
