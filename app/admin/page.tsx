"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import type { Job } from "@/lib/supabase"

const REGIONS = ["서울", "경기", "인천", "기타"] as const
const JOB_TYPES = ["경비", "청소", "조리", "돌봄", "기타"] as const

const STATUS_COLUMNS = [
  { key: "unmatched", label: "미매칭", color: "bg-red-100 border-red-300 text-red-800" },
  { key: "pending",   label: "매칭 대기", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
  { key: "assigned",  label: "배정 완료", color: "bg-green-100 border-green-300 text-green-800" },
] as const

type JobForm = {
  title: string
  region: string
  job_type: string
  required_career: string
}

type FormErrors = Partial<Record<keyof JobForm | "submit", string>>

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<JobForm>({ title: "", region: "", job_type: "", required_career: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [addSuccess, setAddSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false })
    setJobs(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchJobs() }, [fetchJobs])

  function update(field: keyof JobForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      setErrors(prev => ({ ...prev, [field]: undefined }))
      setAddSuccess(false)
    }
  }

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.title.trim()) errs.title = "공고명을 입력해 주세요."
    if (!form.region) errs.region = "지역을 선택해 주세요."
    if (!form.job_type) errs.job_type = "직종을 선택해 주세요."
    return errs
  }

  async function handleAddJob(e: React.FormEvent) {
    e.preventDefault()
    setAddSuccess(false)

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    const { error } = await supabase.from("jobs").insert({
      title: form.title.trim(),
      region: form.region,
      job_type: form.job_type,
      required_career: Number(form.required_career) || 0,
    })
    setSubmitting(false)

    if (error) {
      setErrors({ submit: "저장 중 오류가 발생했습니다." })
      return
    }

    setAddSuccess(true)
    setForm({ title: "", region: "", job_type: "", required_career: "" })
    setErrors({})
    fetchJobs()
  }

  async function handleDelete(id: string) {
    if (!confirm("이 일자리를 삭제하시겠습니까?")) return
    setDeletingId(id)
    await supabase.from("jobs").delete().eq("id", id)
    setDeletingId(null)
    fetchJobs()
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">담당자 대시보드</h1>
      <p className="text-xl text-gray-500 mb-10">매칭 현황과 일자리를 관리합니다.</p>

      {/* 매칭 현황 요약 (다음 블록에서 데이터 연동) */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {STATUS_COLUMNS.map(({ key, label, color }) => (
          <div key={key} className={`rounded-2xl border-2 p-6 text-center ${color}`}>
            <div className="text-5xl font-extrabold mb-2">—</div>
            <div className="text-xl font-semibold">{label}</div>
          </div>
        ))}
      </div>

      <hr className="border-gray-200 mb-10" />

      {/* 일자리 관리 */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">일자리 관리</h2>

      {/* 일자리 추가 폼 */}
      <div className="bg-white rounded-2xl shadow p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">일자리 추가</h3>

        {addSuccess && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl px-6 py-4 mb-6 flex items-center gap-3">
            <span className="text-green-600 text-2xl font-bold">✓</span>
            <span className="text-green-800 text-lg font-semibold">일자리가 등록되었습니다</span>
          </div>
        )}
        {errors.submit && (
          <div className="bg-red-50 border-2 border-red-400 rounded-xl px-6 py-4 mb-6">
            <span className="text-red-800 text-lg">{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleAddJob} noValidate className="grid grid-cols-2 gap-6">
          {/* 공고명 */}
          <div className="col-span-2">
            {errors.title && (
              <div className="bg-red-50 border border-red-400 rounded-lg px-4 py-2 mb-2">
                <span className="text-red-700 text-base font-medium">{errors.title}</span>
              </div>
            )}
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              공고명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={update("title")}
              placeholder="예: 아파트 경비원"
              className={`w-full border-2 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.title ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
              }`}
            />
          </div>

          {/* 지역 */}
          <div>
            {errors.region && (
              <div className="bg-red-50 border border-red-400 rounded-lg px-4 py-2 mb-2">
                <span className="text-red-700 text-base font-medium">{errors.region}</span>
              </div>
            )}
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              지역 <span className="text-red-500">*</span>
            </label>
            <select
              value={form.region}
              onChange={update("region")}
              className={`w-full border-2 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.region ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
              }`}
            >
              <option value="">지역 선택</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* 직종 */}
          <div>
            {errors.job_type && (
              <div className="bg-red-50 border border-red-400 rounded-lg px-4 py-2 mb-2">
                <span className="text-red-700 text-base font-medium">{errors.job_type}</span>
              </div>
            )}
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              직종 <span className="text-red-500">*</span>
            </label>
            <select
              value={form.job_type}
              onChange={update("job_type")}
              className={`w-full border-2 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.job_type ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
              }`}
            >
              <option value="">직종 선택</option>
              {JOB_TYPES.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>

          {/* 요구 경력 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              요구 경력 (년)
            </label>
            <input
              type="number"
              value={form.required_career}
              onChange={update("required_career")}
              min="0"
              max="50"
              placeholder="0"
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition"
            />
          </div>

          {/* 제출 */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-xl font-bold px-10 py-4 rounded-xl transition"
            >
              {submitting ? "저장 중..." : "일자리 추가"}
            </button>
          </div>
        </form>
      </div>

      {/* 일자리 목록 테이블 */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700">
            등록된 일자리 목록
            {!loading && (
              <span className="ml-3 text-lg font-normal text-gray-400">({jobs.length}건)</span>
            )}
          </h3>
        </div>

        {loading ? (
          <div className="px-8 py-12 text-center text-xl text-gray-400">불러오는 중...</div>
        ) : jobs.length === 0 ? (
          <div className="px-8 py-12 text-center text-xl text-gray-400">
            등록된 일자리가 없습니다. 위 폼에서 추가해 보세요.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-semibold text-gray-600">공고명</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold text-gray-600">지역</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold text-gray-600">직종</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold text-gray-600">요구 경력</th>
                  <th className="px-6 py-4 text-center text-lg font-semibold text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map(job => (
                  <tr key={job.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-lg font-medium text-gray-900">{job.title}</td>
                    <td className="px-6 py-4 text-lg text-gray-600">{job.region}</td>
                    <td className="px-6 py-4 text-lg text-gray-600">{job.job_type}</td>
                    <td className="px-6 py-4 text-lg text-gray-600">{job.required_career}년</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={deletingId === job.id}
                        className="bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-700 font-semibold text-base px-5 py-2 rounded-lg transition"
                      >
                        {deletingId === job.id ? "삭제 중..." : "삭제"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
