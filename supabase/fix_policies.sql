-- Fix for infinite recursion in profiles policies
-- Run this in Supabase SQL Editor AFTER running the initial schema

-- First, drop the problematic policies
DROP POLICY IF EXISTS "Students can view own profile" ON profiles;
DROP POLICY IF EXISTS "Students can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can manage profiles" ON profiles;

-- Create simpler policies that don't cause recursion

-- Students can view and update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow INSERT for new user registration (needed for signup)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- For admin access, we'll use a simpler approach
-- Admin operations should be done via service role key or manually
-- This avoids the recursion issue

-- Optional: If you need admin SELECT access without recursion
-- You can check user metadata instead of querying the table
CREATE POLICY "Service role can do anything"
  ON profiles FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
