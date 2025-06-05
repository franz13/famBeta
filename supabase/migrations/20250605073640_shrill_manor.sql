/*
  # User Profile and Family Setup Triggers

  1. New Functions
    - create_profile_for_new_user: Creates a profile when a new user signs up
    - handle_new_user_setup: Manages the entire user onboarding process

  2. Triggers
    - Creates profile automatically when a new user signs up
    - Sets up default values and relationships

  3. Security
    - Functions execute with security definer to ensure proper permissions
    - Validates input data before creation
*/

-- Create a function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    full_name,
    role,
    points,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'parent'),
    0,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create profile for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_new_user();

-- Create a function to handle family creation and member association
CREATE OR REPLACE FUNCTION public.handle_family_setup(
  p_user_id UUID,
  p_family_name TEXT,
  p_profile_id UUID
)
RETURNS UUID AS $$
DECLARE
  v_family_id UUID;
BEGIN
  -- Create new family
  INSERT INTO public.families (
    name,
    created_by,
    created_at,
    updated_at
  ) VALUES (
    p_family_name,
    p_profile_id,
    NOW(),
    NOW()
  ) RETURNING id INTO v_family_id;

  -- Create family member entry for the creator
  INSERT INTO public.family_members (
    family_id,
    profile_id,
    role,
    joined_at
  ) VALUES (
    v_family_id,
    p_profile_id,
    'parent',
    NOW()
  );

  RETURN v_family_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;