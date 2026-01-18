import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Lesson, Profile } from '@/lib/types'

type Tab = 'lessons' | 'students' | 'attendance' | 'grades' | 'analytics'

export default function AdminDashboard() {
    const { profile, signOut } = useAuth()
    const [activeTab, setActiveTab] = useState<Tab>('lessons')
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [students, setStudents] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const [lessonsRes, studentsRes] = await Promise.all([
                supabase.from('lessons').select('*').order('lesson_order'),
                supabase.from('profiles').select('*').eq('role', 'student')
            ])

            setLessons(lessonsRes.data || [])
            setStudents(studentsRes.data || [])
        } catch (error) {
            console.error('Məlumat yüklənmədi:', error)
        } finally {
            setLoading(false)
        }
    }

    const tabs = [
        { id: 'lessons', label: 'Dərslər', icon: '📚' },
        { id: 'students', label: 'Tələbələr', icon: '👨‍🎓' },
        { id: 'attendance', label: 'Davamiyyət', icon: '📅' },
        { id: 'grades', label: 'Qiymətlər', icon: '📝' },
        { id: 'analytics', label: 'Analitika', icon: '📊' },
    ] as const

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
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin İdarə Paneli</h1>
                            <p className="text-sm text-gray-600">Xoş gəlmisiniz, {profile?.full_name}</p>
                        </div>
                        <button onClick={() => signOut()}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                            Çıxış
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${activeTab === tab.id
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {activeTab === 'lessons' && (
                        <LessonsTab lessons={lessons} onRefresh={loadData} />
                    )}
                    {activeTab === 'students' && (
                        <StudentsTab students={students} />
                    )}
                    {activeTab === 'attendance' && (
                        <AttendanceTab students={students} />
                    )}
                    {activeTab === 'grades' && (
                        <GradesTab students={students} lessons={lessons} />
                    )}
                    {activeTab === 'analytics' && (
                        <AnalyticsTab students={students} lessons={lessons} />
                    )}
                </div>
            </div>
        </div>
    )
}

// Dərslər Tab
function LessonsTab({ lessons, onRefresh }: { lessons: Lesson[], onRefresh: () => void }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Dərslər ({lessons.length})</h2>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">
                    + Yeni Dərs
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">#</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Başlıq</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Animasiya</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tarix</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Əməliyyat</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {lessons.map((lesson, index) => (
                            <tr key={lesson.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{index + 1}</td>
                                <td className="px-4 py-3 font-medium">{lesson.title}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{lesson.animation_type}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    {new Date(lesson.created_at).toLocaleDateString('az-AZ')}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button className="text-blue-500 hover:underline text-sm">Düzəliş</button>
                                        <button className="text-red-500 hover:underline text-sm">Sil</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Tələbələr Tab
function StudentsTab({ students }: { students: Profile[] }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Tələbələr ({students.length})</h2>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">
                    + Tələbə Əlavə Et
                </button>
            </div>

            {students.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    Hələ tələbə qeydiyyatdan keçməyib
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Ad</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sinif</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Qeydiyyat</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Əməliyyat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {students.map(student => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">{student.full_name}</td>
                                    <td className="px-4 py-3 text-sm">{student.grade_level}-ci sinif</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {new Date(student.created_at).toLocaleDateString('az-AZ')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button className="text-blue-500 hover:underline text-sm">Bax</button>
                                            <button className="text-red-500 hover:underline text-sm">Sil</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

// Davamiyyət Tab
function AttendanceTab({ students }: { students: Profile[] }) {
    const today = new Date().toISOString().split('T')[0]
    const [selectedDate, setSelectedDate] = useState(today)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Davamiyyət</h2>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                />
            </div>

            <div className="grid gap-3">
                {students.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">{student.full_name}</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                                İştirak
                            </button>
                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                                Qayıb
                            </button>
                            <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">
                                Bağışlı
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Qiymətlər Tab
function GradesTab({ students, lessons }: { students: Profile[], lessons: Lesson[] }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-6">Qiymətləndirmə</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-3">Dərs seçin:</h3>
                    <select className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Bütün dərslər</option>
                        {lessons.map(lesson => (
                            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Tələbə seçin:</h3>
                    <select className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Bütün tələbələr</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.full_name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-6 p-8 bg-gray-50 rounded-lg text-center text-gray-500">
                Ev tapşırığı təqdim edildikdən sonra burada qiymətləndirmə edə bilərsiniz
            </div>
        </div>
    )
}

// Analitika Tab
function AnalyticsTab({ students, lessons }: { students: Profile[], lessons: Lesson[] }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-6">Analitika</h2>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">{lessons.length}</p>
                    <p className="text-sm text-gray-600">Ümumi dərs</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">{students.length}</p>
                    <p className="text-sm text-gray-600">Ümumi tələbə</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-purple-600">0</p>
                    <p className="text-sm text-gray-600">Təqdim edilmiş</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-amber-600">0%</p>
                    <p className="text-sm text-gray-600">Orta davamiyyət</p>
                </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-lg text-center text-gray-500">
                Daha çox məlumat toplandıqdan sonra detallı qrafiklər burada göstəriləcək
            </div>
        </div>
    )
}
