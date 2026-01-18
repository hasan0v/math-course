import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import LessonViewer from './pages/LessonViewer'
import HomeworkSubmission from './pages/HomeworkSubmission'
import AdminDashboard from './pages/AdminDashboard'

// Protected route komponenti
function ProtectedRoute({
    children,
    adminOnly = false,
}: {
    children: React.ReactNode
    adminOnly?: boolean
}) {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Yüklənir...</p>
                </div>
            </div>
        )
    }

    if (!user || !profile) {
        return <Navigate to="/login" replace />
    }

    if (adminOnly && profile.role !== 'admin') {
        return <Navigate to="/student" replace />
    }

    return <>{children}</>
}

export default function AppRoutes() {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Yüklənir...</p>
                </div>
            </div>
        )
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to={profile?.role === 'admin' ? '/admin' : '/student'} replace />}
            />

            <Route
                path="/student"
                element={
                    <ProtectedRoute>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/lesson/:id"
                element={
                    <ProtectedRoute>
                        <LessonViewer />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student/homework/:id"
                element={
                    <ProtectedRoute>
                        <HomeworkSubmission />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute adminOnly>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={
                    <Navigate
                        to={!user ? '/login' : profile?.role === 'admin' ? '/admin' : '/student'}
                        replace
                    />
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
