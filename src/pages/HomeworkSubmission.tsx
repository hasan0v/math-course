import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Homework, HomeworkSubmission as SubmissionType, Grade, Lesson } from '@/lib/types'

export default function HomeworkSubmission() {
    const { id } = useParams<{ id: string }>()
    const { profile } = useAuth()
    const navigate = useNavigate()

    const [homework, setHomework] = useState<Homework | null>(null)
    const [lesson, setLesson] = useState<Lesson | null>(null)
    const [existingSubmission, setExistingSubmission] = useState<SubmissionType | null>(null)
    const [grade, setGrade] = useState<Grade | null>(null)

    const [submissionText, setSubmissionText] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (id) loadData()
    }, [id])

    const loadData = async () => {
        try {
            // Ev tapşırığını yüklə
            const { data: homeworkData } = await supabase
                .from('homework')
                .select('*, lessons(*)')
                .eq('id', id)
                .single()

            if (homeworkData) {
                setHomework(homeworkData)
                setLesson(homeworkData.lessons)
            }

            // Mövcud təqdim yoxla
            const { data: submissionData } = await supabase
                .from('homework_submissions')
                .select('*')
                .eq('homework_id', id)
                .eq('student_id', profile?.id)
                .single()

            if (submissionData) {
                setExistingSubmission(submissionData)
                setSubmissionText(submissionData.submission_text || '')

                // Qiyməti yoxla
                const { data: gradeData } = await supabase
                    .from('grades')
                    .select('*')
                    .eq('submission_id', submissionData.id)
                    .single()

                if (gradeData) setGrade(gradeData)
            }
        } catch (error) {
            console.error('Məlumat yüklənmədi:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!submissionText.trim()) {
            alert('Zəhmət olmasa cavabınızı daxil edin')
            return
        }

        setSubmitting(true)
        try {
            const { error } = await supabase
                .from('homework_submissions')
                .upsert({
                    homework_id: id,
                    student_id: profile?.id,
                    submission_text: submissionText,
                    submitted_at: new Date().toISOString(),
                })

            if (error) throw error

            alert('Təqdim uğurla göndərildi!')
            navigate('/student')
        } catch (error) {
            console.error('Xəta:', error)
            alert('Xəta baş verdi')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Yüklənir...</p>
                </div>
            </div>
        )
    }

    if (!homework) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Ev tapşırığı tapılmadı</p>
                    <Link to="/student" className="text-blue-500 hover:underline mt-4 block">
                        Əsas səhifəyə qayıt
                    </Link>
                </div>
            </div>
        )
    }

    const isOverdue = new Date(homework.due_date) < new Date()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <Link to="/student" className="text-gray-600 hover:text-gray-900 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{homework.title}</h1>
                            <p className="text-sm text-gray-600">{lesson?.title}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tapşırıq məlumatı */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-lg font-semibold">Tapşırıq Təsviri</h2>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                            {isOverdue ? 'Vaxt keçib' : 'Vaxt var'}
                        </div>
                    </div>
                    <p className="text-gray-700 mb-4">{homework.description}</p>
                    <p className="text-sm text-gray-500">
                        <strong>Son tarix:</strong> {new Date(homework.due_date).toLocaleDateString('az-AZ')}
                    </p>
                </div>

                {/* Qiymət (əgər varsa) */}
                {grade && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span>📊</span> Qiymətləndirmə Nəticəsi
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-blue-600">{grade.score}</p>
                                <p className="text-sm text-gray-500">/ 100</p>
                            </div>
                            {grade.feedback && (
                                <div className="flex-1 p-4 bg-white rounded-lg">
                                    <p className="text-sm text-gray-600"><strong>Müəllim rəyi:</strong></p>
                                    <p className="text-gray-800 mt-1">{grade.feedback}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Təqdim formu */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        {existingSubmission ? 'Təqdiminizi Düzəldin' : 'Cavabınızı Daxil Edin'}
                    </h2>

                    {existingSubmission && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                            Əvvəlki təqdim tarixi: {new Date(existingSubmission.submitted_at).toLocaleString('az-AZ')}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={submissionText}
                            onChange={e => setSubmissionText(e.target.value)}
                            placeholder="Cavabınızı buraya yazın..."
                            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                            disabled={!!grade}
                        />

                        {!grade && (
                            <div className="mt-4 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={submitting || !!grade}
                                    className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition disabled:opacity-50"
                                >
                                    {submitting ? 'Göndərilir...' : existingSubmission ? 'Yenilə' : 'Təqdim Et'}
                                </button>
                                <Link
                                    to="/student"
                                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition text-center"
                                >
                                    Ləğv Et
                                </Link>
                            </div>
                        )}

                        {grade && (
                            <p className="mt-4 text-center text-gray-500">
                                Bu tapşırıq artıq qiymətləndirilib. Düzəliş etmək mümkün deyil.
                            </p>
                        )}
                    </form>
                </div>
            </main>
        </div>
    )
}
