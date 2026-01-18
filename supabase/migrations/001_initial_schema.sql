-- Riyaziyyat Təlim Platforması - İlkin Verilənlər Bazası Sxemi
-- Bu fayl Supabase SQL Editor-da işlədilməlidir

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT CHECK (role IN ('student', 'admin')) NOT NULL DEFAULT 'student',
  full_name TEXT NOT NULL,
  grade_level INTEGER CHECK (grade_level BETWEEN 1 AND 12),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LESSONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  animation_type TEXT NOT NULL,
  animation_config JSONB DEFAULT '{}'::jsonb,
  video_url TEXT,
  lesson_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STUDENT PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(student_id, lesson_id)
);

-- ============================================
-- HOMEWORK TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS homework (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- HOMEWORK SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS homework_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  homework_id UUID REFERENCES homework(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  submission_text TEXT,
  file_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(homework_id, student_id)
);

-- ============================================
-- GRADES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES homework_submissions(id) ON DELETE CASCADE NOT NULL,
  score INTEGER CHECK (score >= 0 AND score <= 100) NOT NULL,
  feedback TEXT,
  graded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ATTENDANCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('present', 'absent', 'excused')) NOT NULL,
  UNIQUE(student_id, date)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================
-- Students can view their own profile
CREATE POLICY "Students can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Students can update their own profile
CREATE POLICY "Students can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can manage all profiles
CREATE POLICY "Admins can manage profiles"
  ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- LESSONS POLICIES
-- ============================================
-- Everyone can view lessons
CREATE POLICY "Everyone can view lessons"
  ON lessons FOR SELECT
  USING (true);

-- Only admins can manage lessons
CREATE POLICY "Admins can manage lessons"
  ON lessons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- STUDENT PROGRESS POLICIES
-- ============================================
-- Students can view their own progress
CREATE POLICY "Students can view own progress"
  ON student_progress FOR SELECT
  USING (student_id = auth.uid());

-- Students can insert/update their own progress
CREATE POLICY "Students can manage own progress"
  ON student_progress FOR ALL
  USING (student_id = auth.uid());

-- Admins can view all progress
CREATE POLICY "Admins can view all progress"
  ON student_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- HOMEWORK POLICIES
-- ============================================
-- Everyone can view homework
CREATE POLICY "Everyone can view homework"
  ON homework FOR SELECT
  USING (true);

-- Only admins can manage homework
CREATE POLICY "Admins can manage homework"
  ON homework FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- HOMEWORK SUBMISSIONS POLICIES
-- ============================================
-- Students can view their own submissions
CREATE POLICY "Students can view own submissions"
  ON homework_submissions FOR SELECT
  USING (student_id = auth.uid());

-- Students can insert/update their own submissions
CREATE POLICY "Students can manage own submissions"
  ON homework_submissions FOR ALL
  USING (student_id = auth.uid());

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
  ON homework_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- GRADES POLICIES
-- ============================================
-- Students can view grades for their submissions
CREATE POLICY "Students can view own grades"
  ON grades FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM homework_submissions
      WHERE id = grades.submission_id AND student_id = auth.uid()
    )
  );

-- Only admins can manage grades
CREATE POLICY "Admins can manage grades"
  ON grades FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- ATTENDANCE POLICIES
-- ============================================
-- Students can view their own attendance
CREATE POLICY "Students can view own attendance"
  ON attendance FOR SELECT
  USING (student_id = auth.uid());

-- Only admins can manage attendance
CREATE POLICY "Admins can manage attendance"
  ON attendance FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Create storage buckets for homework files and lesson videos
-- (Run these commands in Supabase Storage UI or via SQL)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('homework-files', 'homework-files', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('lesson-videos', 'lesson-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for homework files
CREATE POLICY "Students can upload homework files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'homework-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Students can view own homework files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'homework-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all homework files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'homework-files' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Storage policies for lesson videos
CREATE POLICY "Everyone can view lesson videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'lesson-videos');

CREATE POLICY "Admins can upload lesson videos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'lesson-videos' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_student_progress_student ON student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_lesson ON student_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_homework_lesson ON homework(lesson_id);
CREATE INDEX IF NOT EXISTS idx_homework_submissions_homework ON homework_submissions(homework_id);
CREATE INDEX IF NOT EXISTS idx_homework_submissions_student ON homework_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_submission ON grades(submission_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(lesson_order);
