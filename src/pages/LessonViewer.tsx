import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Lesson } from '@/lib/types'

// Animation Components
import QuadraticFunction from '@/components/animations/QuadraticFunction'
import LinearSystemSolver from '@/components/animations/LinearSystemSolver'
import TrigonometryVisualization from '@/components/animations/TrigonometryVisualization'
import CircleProperties from '@/components/animations/CircleProperties'
import SequenceVisualizer from '@/components/animations/SequenceVisualizer'
import DerivativeExplorer from '@/components/animations/DerivativeExplorer'
import ProbabilitySimulator from '@/components/animations/ProbabilitySimulator'
import InequalitySolver from '@/components/animations/InequalitySolver'
import PolynomialFactorizer from '@/components/animations/PolynomialFactorizer'
import PlaceholderAnimation from '@/components/animations/PlaceholderAnimation'

// Animation type to component mapping
const animationComponents: Record<string, React.FC<any>> = {
    'quadratic-function': QuadraticFunction,
    'linear-system': LinearSystemSolver,
    'trigonometry': TrigonometryVisualization,
    'circle-properties': CircleProperties,
    'sequences': SequenceVisualizer,
    'derivative-explorer': DerivativeExplorer,
    'probability-simulator': ProbabilitySimulator,
    'inequality-solver': InequalitySolver,
    'polynomial-factorizer': PolynomialFactorizer,
    'rational-equations': SequenceVisualizer, // reuse for similar visualization
}

export default function LessonViewer() {
    const { id } = useParams<{ id: string }>()
    const { profile } = useAuth()
    const [lesson, setLesson] = useState<Lesson | null>(null)
    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            loadLesson()
            checkProgress()
        }
    }, [id])

    const loadLesson = async () => {
        try {
            const { data, error } = await supabase
                .from('lessons')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            setLesson(data)
        } catch (error) {
            console.error('Dərs yüklənmədi:', error)
        } finally {
            setLoading(false)
        }
    }

    const checkProgress = async () => {
        try {
            const { data } = await supabase
                .from('student_progress')
                .select('*')
                .eq('student_id', profile?.id)
                .eq('lesson_id', id)
                .single()

            if (data) {
                setCompleted(data.completed)
            }
        } catch (error) {
            // Progress yoxdur
        }
    }

    const markAsCompleted = async () => {
        try {
            const { error } = await supabase
                .from('student_progress')
                .upsert({
                    student_id: profile?.id,
                    lesson_id: id,
                    completed: true,
                    completed_at: new Date().toISOString(),
                })

            if (error) throw error
            setCompleted(true)
            alert('Təbriklər! Dərs tamamlandı.')
        } catch (error) {
            console.error('Xəta:', error)
            alert('Xəta baş verdi')
        }
    }

    // Get the appropriate animation component
    const getAnimationComponent = () => {
        if (!lesson) return null

        const AnimationComponent = animationComponents[lesson.animation_type]
        if (AnimationComponent) {
            return <AnimationComponent config={lesson.animation_config} />
        }
        return <PlaceholderAnimation title={lesson.animation_type} />
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

    if (!lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Dərs tapılmadı</p>
                    <Link to="/student" className="text-blue-500 hover:underline mt-4 block">
                        Əsas səhifəyə qayıt
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/student" className="text-gray-600 hover:text-gray-900 transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
                                <p className="text-sm text-gray-600">İnteraktiv dərs</p>
                            </div>
                        </div>
                        {!completed ? (
                            <button
                                onClick={markAsCompleted}
                                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Dərsi Tamamla
                            </button>
                        ) : (
                            <span className="px-6 py-2 bg-green-100 text-green-700 font-medium rounded-lg flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Tamamlandı
                            </span>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Animation Section - Full Width on Top */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span>📊</span> İnteraktiv Animasiya
                    </h2>
                    <div className="min-h-[400px]">
                        {getAnimationComponent()}
                    </div>
                </div>

                {/* Lesson Content */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span>📖</span> Dərs Məzmunu
                    </h2>
                    <div className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
                        <ReactMarkdown>{lesson.content}</ReactMarkdown>
                    </div>
                </div>
            </main>
        </div>
    )
}
