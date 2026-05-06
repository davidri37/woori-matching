export default function RecommendationsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">자동 매칭 추천 목록</h1>
      <p className="text-xl text-gray-500 mb-10">
        매칭 점수 높은 순으로 표시됩니다.
      </p>

      {/* 필터 영역 껍데기 */}
      <div className="flex gap-4 mb-8">
        <select
          disabled
          className="border-2 border-gray-300 rounded-xl px-5 py-3 text-lg text-gray-400 bg-white cursor-not-allowed"
        >
          <option>지역 전체</option>
        </select>
        <select
          disabled
          className="border-2 border-gray-300 rounded-xl px-5 py-3 text-lg text-gray-400 bg-white cursor-not-allowed"
        >
          <option>직종 전체</option>
        </select>
      </div>

      {/* 추천 카드 목록 자리 */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-6 flex items-center justify-between opacity-40"
          >
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-800">
                홍길동 → 경비원 (서울 강남구)
              </div>
              <div className="text-lg text-gray-500">지역 일치 · 경력 충족</div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-extrabold text-blue-600">85점</div>
              <div className="text-lg text-gray-400 mt-1">매칭 점수</div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 text-lg mt-10">
        ※ 데이터 연동은 다음 블록에서 구현됩니다.
      </p>
    </div>
  );
}
