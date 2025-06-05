/*
  # Family Member Management Policies and Functions
  
  1. Policies
    - Drop and recreate RLS policies for family_members table
    - Ensure proper access control for viewing and adding family members
  
  2. Functions
    - Helper functions for validation and checks
    - Main function for adding family members with proper error handling
*/

-- First drop existing policies if they exist
DROP POLICY IF EXISTS "Family members can view their family members" ON family_members;
DROP POLICY IF EXISTS "Parents can add family members" ON family_members;

-- Recreate the policies
CREATE POLICY "Family members can view their family members"
  ON family_members FOR SELECT
  TO authenticated
  USING (
    family_id IN (
      SELECT family_id FROM family_members fm
      JOIN profiles p ON p.id = fm.profile_id
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can add family members"
  ON family_members FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM family_members fm
      JOIN profiles p ON p.id = fm.profile_id
      WHERE p.user_id = auth.uid()
      AND fm.role = 'parent'
      AND fm.family_id = family_members.family_id
    )
  );

-- Drop existing functions to avoid conflicts
DROP FUNCTION IF EXISTS public.validate_family_member(UUID, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.check_family_member_limit(UUID);
DROP FUNCTION IF EXISTS public.add_family_member(UUID, TEXT, TEXT, TEXT, UUID);

-- Helper function to validate family member data
CREATE OR REPLACE FUNCTION public.validate_family_member(
  p_family_id UUID,
  p_email TEXT,
  p_role TEXT
) RETURNS VOID AS $$
BEGIN
  -- Validate role
  IF p_role NOT IN ('parent', 'child') THEN
    RAISE EXCEPTION 'Invalid role. Must be parent or child';
  END IF;
  
  -- Validate email format
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check family member limits
CREATE OR REPLACE FUNCTION public.check_family_member_limit(
  p_family_id UUID
) RETURNS VOID AS $$
BEGIN
  IF (SELECT COUNT(*) FROM family_members WHERE family_id = p_family_id) >= 10 THEN
    RAISE EXCEPTION 'Maximum family members limit reached';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Main function to add family members
CREATE OR REPLACE FUNCTION public.add_family_member(
  p_family_id UUID,
  p_full_name TEXT,
  p_email TEXT,
  p_role TEXT,
  p_added_by UUID
) RETURNS UUID AS $$
DECLARE
  v_profile_id UUID;
  v_user_id UUID;
BEGIN
  -- Validate caller has permission
  IF NOT EXISTS (
    SELECT 1 FROM family_members fm
    JOIN profiles p ON p.id = fm.profile_id
    WHERE fm.family_id = p_family_id
    AND p.id = p_added_by
    AND fm.role = 'parent'
  ) THEN
    RAISE EXCEPTION 'Only family parents can add members';
  END IF;

  -- Run validations
  PERFORM validate_family_member(p_family_id, p_email, p_role);
  PERFORM check_family_member_limit(p_family_id);

  -- Create profile
  INSERT INTO profiles (
    full_name,
    role,
    created_at,
    updated_at
  ) VALUES (
    p_full_name,
    p_role,
    NOW(),
    NOW()
  ) RETURNING id INTO v_profile_id;

  -- Create family member association
  INSERT INTO family_members (
    family_id,
    profile_id,
    role,
    joined_at
  ) VALUES (
    p_family_id,
    v_profile_id,
    p_role,
    NOW()
  );

  RETURN v_profile_id;
EXCEPTION
  WHEN OTHERS THEN
    -- Clean up profile if something fails
    IF v_profile_id IS NOT NULL THEN
      DELETE FROM profiles WHERE id = v_profile_id;
    END IF;
    RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;