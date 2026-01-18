import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [gradeLevel, setGradeLevel] = useState(9)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { signIn, signUp } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isLogin) {
                await signIn(email, password)
            } else {
                await signUp(email, password, fullName, gradeLevel)
            }
        } catch (err: any) {
            setError(err.message || 'Bir səhv baş verdi')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        📐 Riyaziyyat Platforması
                    </h1>
                    <p className="text-gray-600">
                        İnteraktiv dərslərlə riyaziyyatı öyrənin
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${isLogin
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Giriş
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${!isLogin
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Qeydiyyat
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ad və Soyad
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                    placeholder="Adınızı daxil edin"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Şifrə
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sinif
                                </label>
                                <select
                                    value={gradeLevel}
                                    onChange={(e) => setGradeLevel(Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                >
                                    <option value={9}>9-cu sinif</option>
                                    <option value={10}>10-cu sinif</option>
                                    <option value={11}>11-ci sinif</option>
                                </select>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Yüklənir...' : isLogin ? 'Daxil ol' : 'Qeydiyyatdan keç'}
                        </button>
                    </form>

                    {isLogin && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <strong>Admin giriş:</strong>
                                <br />
                                Email: admin@mathplatform.az
                                <br />
                                Şifrə: (Supabase-də konfiqurasiya edilməlidir)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
