// Database Types
export interface Profile {
    id: string
    role: 'student' | 'admin'
    full_name: string
    grade_level: number
    created_at: string
}

export interface Lesson {
    id: string
    title: string
    content: string
    animation_type: string
    animation_config: Record<string, any>
    video_url?: string
    lesson_order: number
    created_at: string
}

export interface StudentProgress {
    id: string
    student_id: string
    lesson_id: string
    completed: boolean
    completed_at?: string
}

export interface Homework {
    id: string
    lesson_id: string
    title: string
    description: string
    due_date: string
    created_at: string
}

export interface HomeworkSubmission {
    id: string
    homework_id: string
    student_id: string
    submission_text?: string
    file_url?: string
    submitted_at: string
}

export interface Grade {
    id: string
    submission_id: string
    score: number
    feedback?: string
    graded_at: string
}

export interface Attendance {
    id: string
    student_id: string
    date: string
    status: 'present' | 'absent' | 'excused'
}

// Animation Types
export type AnimationType =
    | 'quadratic-function'
    | 'linear-system'
    | 'circle-properties'
    | 'trigonometry'
    | 'rational-equations'
    | 'sequences'
    | 'polynomial-factorizer'
    | 'derivative-explorer'
    | 'integral-calculator'
    | 'probability-simulator'

export interface AnimationConfig {
    [key: string]: number | string | boolean
}

// Context Types
export interface AuthContextType {
    user: any | null
    profile: Profile | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, fullName: string, gradeLevel: number) => Promise<void>
    signOut: () => Promise<void>
}
