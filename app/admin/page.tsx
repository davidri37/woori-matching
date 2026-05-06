const STATUS_COLUMNS = [
  { key: "unmatched", label: "미매칭", color: "bg-red-100 border-red-300 text-red-800" },
  { key: "pending", label: "매칭 대기", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
  { key: "assigned", label: "배정 완료", color: "bg-green-100 border-green-300 text-green-800" },
] as const;

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">담당자 대시보드</h1>
      <p className="text-xl text-gray-500 mb-10">
        매칭 현황을 한눈에 확인하고 관리합니다.
      </p>

      {/* 요약 통계 자리 */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {STATUS_COLUMNS.map(({ key, label, color }) => (
          <div key={key} className={`rounded-2xl border-2 p-6 text-center ${color}`}>
            <div className="text-5xl font-extrabold mb-2">—</div>
            <div className="text-xl font-semibold">{label}</div>
          </div>
        ))}
      </div>

      {/* 칸반 컬럼 */}
      <div className="grid grid-cols-3 gap-6">
        {STATUS_COLUMNS.map(({ key, label, color }) => (
          <div key={key} className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">{label}</h2>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`rounded-xl border-2 px-4 py-3 opacity-40 ${color}`}
                >
                  <div className="text-lg font-semibold">홍길동</div>
                  <div className="text-base text-gray-600">경비원 · 서울</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 text-lg mt-10">
        ※ 실제 데이터 연동은 다음 블록에서 구현됩니다.
      </p>
    </div>
  );
}
