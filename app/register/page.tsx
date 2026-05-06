"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

const REGIONS = ["서울", "경기", "인천", "기타"] as const
const JOB_TYPES = ["경비", "청소", "조리", "돌봄", "기타"] as const

type FormState = {
  name: string
  region: string
  desired_job: string
  career_years: string
}

type FormErrors = Partial<Record<keyof FormState | "submit", string>>

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    region: "",
    desired_job: "",
    career_years: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      setErrors(prev => ({ ...prev, [field]: undefined }))
      setSuccess(false)
    }
  }

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = "이름을 입력해 주세요."
    if (!form.region) errs.region = "지역을 선택해 주세요."
    if (!form.desired_job) errs.desired_job = "희망 직종을 선택해 주세요."
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(false)

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    const { error } = await supabase.from("seniors").insert({
      name: form.name.trim(),
      region: form.region,
      desired_job: form.desired_job,
      career_years: Number(form.career_years) || 0,
    })
    setSubmitting(false)

    if (error) {
      setErrors({ submit: `[${error.code ?? "?"}] ${error.message}` })
      return
    }

    setSuccess(true)
    setForm({ name: "", region: "", desired_job: "", career_years: "" })
    setErrors({})
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">프로필 등록</h1>
      <p className="text-xl text-gray-500 mb-8">
        아래 정보를 입력하시면 맞는 일자리를 찾아드립니다.
      </p>

      {success && (
        <div className="bg-green-50 border-2 border-green-500 rounded-xl px-6 py-4 mb-8 flex items-center gap-3">
          <span className="text-green-600 text-3xl font-bold">✓</span>
          <span className="text-green-800 text-xl font-semibold">등록이 완료되었습니다</span>
        </div>
      )}

      {errors.submit && (
        <div className="bg-red-50 border-2 border-red-400 rounded-xl px-6 py-4 mb-8">
          <span className="text-red-800 text-xl">{errors.submit}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow p-8 space-y-8">
        {/* 이름 */}
        <div>
          {errors.name && (
            <div className="bg-red-50 border border-red-400 rounded-lg px-4 py-2 mb-2">
              <span className="text-red-700 text-lg font-medium">{errors.name}</span>
            </div>
          )}
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={update("name")}
            placeholder="홍길동"
            className={`w-full border-2 rounded-xl px-5 py-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              errors.name ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
            }`}
          />
        </div>

        {/* 지역 */}
        <div>
          {errors.region && (
            <div className="bg-red-50 border border-red-400 rounded-lg px-4 py-2 mb-2">
              <span className="text-red-700 text-lg font-medium">{errors.region}</span>
            </div>
          )}
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            지역 <span className="text-red-500">*</span>
          </label>
          <select
            value={form.region}
            onChange={update("region")}
            className={`w-full border-2 rounded-xl px-5 py-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              errors.region ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
            }`}
          >
            <option value="">지역을 선택하세요</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* 희망 직종 */}
        <div>
          {errors.desired_job && (
            <div className="bg-red-50 border border-red-400 rounded-lg px-4 py-2 mb-2">
              <span className="text-red-700 text-lg font-medium">{errors.desired_job}</span>
            </div>
          )}
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            희망 직종 <span className="text-red-500">*</span>
          </label>
          <select
            value={form.desired_job}
            onChange={update("desired_job")}
            className={`w-full border-2 rounded-xl px-5 py-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              errors.desired_job ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
            }`}
          >
            <option value="">직종을 선택하세요</option>
            {JOB_TYPES.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>

        {/* 경력 */}
        <div>
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            경력 (년)
          </label>
          <input
            type="number"
            value={form.career_years}
            onChange={update("career_years")}
            min="0"
            max="50"
            placeholder="0"
            className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-2xl font-bold py-5 rounded-xl transition"
        >
          {submitting ? "저장 중..." : "등록하기"}
        </button>
      </form>
    </div>
  )
}
