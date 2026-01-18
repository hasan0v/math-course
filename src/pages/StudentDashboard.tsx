import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Lesson, StudentProgress } from '@/lib/types'

export default function StudentDashboard() {
    const { profile, signOut } = useAuth()
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [progress, setProgress] = useState<StudentProgress[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            // Dərsləri yüklə
            const { data: lessonsData } = await supabase
                .from('lessons')
                .select('*')
                .order('lesson_order')

            // Tələbənin tərəqqi məlumatlarını yüklə
            const { data: progressData } = await supabase
                .from('student_progress')
                .select('*')
                .eq('student_id', profile?.id)

            setLessons(lessonsData || [])
            setProgress(progressData || [])
        } catch (error) {
            console.error('Məlumatlar yüklənmədi:', error)
        } finally {
            setLoading(false)
        }
    }

    const isLessonCompleted = (lessonId: string) => {
        return progress.some(p => p.lesson_id === lessonId && p.completed)
    }

    const completedCount = progress.filter(p => p.completed).length
    const totalLessons = lessons.length

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Yüklənir...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Riyaziyyat Platforması
                            </h1>
                            <p className="text-sm text-gray-600">
                                Xoş gəlmisiniz, {profile?.full_name}
                            </p>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                        >
                            Çıxış
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Progress Section */}
                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Tərəqqiniz
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">
                                        {completedCount} / {totalLessons} dərs tamamlandı
                                    </span>
                                    <span className="font-medium text-primary-600">
                                        {totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-primary-500 h-3 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lessons Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dərslər</h2>

                    {lessons.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                            <p className="text-gray-500 text-lg">
                                Hələ dərs əlavə edilməyib. Admin panelindən dərs əlavə edin.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {lessons.map((lesson) => {
                                const completed = isLessonCompleted(lesson.id)
                                return (
                                    <Link
                                        key={lesson.id}
                                        to={`/student/lesson/${lesson.id}`}
                                        className="block group"
                                    >
                                        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full">
                                            <div className="aspect-video bg-gradient-to-br from-primary-400 to-purple-500 relative">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-6xl">📐</span>
                                                </div>
                                                {completed && (
                                                    <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                                                    {lesson.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {lesson.content.substring(0, 100)}...
                                                </p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">
                                                        Animasiya: {lesson.animation_type}
                                                    </span>
                                                    {completed ? (
                                                        <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                            Tamamlandı
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-medium text-gray-400">
                                                            Başlamamısınız
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
