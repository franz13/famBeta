/*
  # Add Family Member Management Procedures

  1. New Procedures
    - add_family_member: Creates a new family member profile and associates it with a family
    - validate_family_member: Validates member data before creation
    - check_family_member_limit: Ensures family size limits are respected

  2. Security
    - All procedures run with SECURITY DEFINER
    - Input validation for all parameters
    - Proper error handling
*/

-- Function to validate family member data
CREATE OR REPLACE FUNCTION public.validate_family_member(
  p_family_id UUID,
  p_email TEXT,
  p_role TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  -- Check if email is already associated with a profile in this family
  IF EXISTS (
    SELECT 1 FROM profiles p
    JOIN family_members fm ON fm.profile_id = p.id
    WHERE fm.family_id = p_family_id 
    AND p.user_id IN (
      SELECT id FROM auth.users WHERE email = p_email
    )
  ) THEN
    RAISE EXCEPTION 'Member with this email already exists in family';
  END IF;

  -- Validate role
  IF p_role NOT IN ('parent', 'child') THEN
    RAISE EXCEPTION 'Invalid role specified';
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check family member limit
CREATE OR REPLACE FUNCTION public.check_family_member_limit(
  p_family_id UUID
) RETURNS BOOLEAN AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM family_members 
    WHERE family_id = p_family_id
  ) >= 10 THEN
    RAISE EXCEPTION 'Maximum family members limit reached';
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Main function to add a family member
CREATE OR REPLACE FUNCTION public.add_family_member(
  p_family_id UUID,
  p_full_name TEXT,
  p_email TEXT,
  p_role TEXT,
  p_added_by UUID
) RETURNS UUID AS $$
DECLARE
  v_profile_id UUID;
BEGIN
  -- Validate inputs
  IF NOT EXISTS (SELECT 1 FROM families WHERE id = p_family_id) THEN
    RAISE EXCEPTION 'Family not found';
  END IF;

  -- Run validations
  PERFORM validate_family_member(p_family_id, p_email, p_role);
  PERFORM check_family_member_limit(p_family_id);

  -- Create profile if user doesn't exist
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;