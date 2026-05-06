export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">프로필 등록</h1>
      <p className="text-xl text-gray-500 mb-10">
        아래 정보를 입력하시면 맞는 일자리를 찾아드립니다.
      </p>

      {/* 폼 껍데기 — 기능 구현은 다음 블록 */}
      <form className="bg-white rounded-2xl shadow p-8 space-y-8">
        {/* 이름 */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            이름
          </label>
          <input
            type="text"
            placeholder="홍길동"
            disabled
            className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-xl text-gray-400 bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* 지역 */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            지역
          </label>
          <select
            disabled
            className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-xl text-gray-400 bg-gray-50 cursor-not-allowed"
          >
            <option>지역을 선택하세요</option>
          </select>
        </div>

        {/* 희망 직종 */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            희망 직종
          </label>
          <input
            type="text"
            placeholder="예: 경비, 청소, 배달"
            disabled
            className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-xl text-gray-400 bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* 경력 */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            경력 (년)
          </label>
          <input
            type="number"
            placeholder="0"
            disabled
            className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-xl text-gray-400 bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled
          className="w-full bg-blue-300 text-white text-2xl font-bold py-5 rounded-xl cursor-not-allowed"
        >
          등록하기 (구현 예정)
        </button>
      </form>
    </div>
  );
}
