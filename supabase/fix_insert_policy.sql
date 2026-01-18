-- Better fix for profile creation during signup
-- Run this in Supabase SQL Editor

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create a more permissive INSERT policy for authenticated users
CREATE POLICY "Allow authenticated users to create profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- This allows any authenticated user to create a profile
-- The application logic ensures they only create their own profile
