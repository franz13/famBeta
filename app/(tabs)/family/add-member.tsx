import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';

export default function AddMemberScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'parent' | 'child'>('child');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInvite = async () => {
    if (!fullName || !email) {
      setError('Te rugăm să completezi toate câmpurile');
      return;
    }

    if (!user || !profile) {
      setError('Eroare de autentificare');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Get user's family ID
      const { data: familyMember, error: familyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', profile.id)
        .single();

      if (familyError) throw new Error('Nu s-a putut găsi familia');

      // Add family member
      const { data: newMember, error: memberError } = await supabase
        .rpc('add_family_member', {
          p_family_id: familyMember.family_id,
          p_full_name: fullName,
          p_email: email,
          p_role: role,
          p_added_by: profile.id
        });

      if (memberError) throw memberError;

      // Send invitation email
      const { error: inviteError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
            role: role,
            profile_id: newMember,
            family_id: familyMember.family_id
          }
        }
      });

      if (inviteError) throw inviteError;

      router.back();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Invită un membru al familiei</Text>
        <Text style={styles.description}>
          Trimite o invitație prin email pentru a adăuga un nou membru în familia ta
        </Text>

        <View style={styles.form}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nume complet</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Introdu numele complet"
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Introdu adresa de email"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rol în familie</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[styles.roleButton, role === 'parent' && styles.roleButtonActive]}
                onPress={() => setRole('parent')}
                disabled={loading}
              >
                <Text style={[styles.roleText, role === 'parent' && styles.roleTextActive]}>
                  Părinte
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleButton, role === 'child' && styles.roleButtonActive]}
                onPress={() => setRole('child')}
                disabled={loading}
              >
                <Text style={[styles.roleText, role === 'child' && styles.roleTextActive]}>
                  Copil
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.inviteButton, (!fullName || !email || loading) && styles.inviteButtonDisabled]}
            onPress={handleInvite}
            disabled={!fullName || !email || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.inviteButtonText}>Trimite invitație</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 30,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.error,
    marginBottom: 15,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.text,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: colors.primary,
  },
  roleText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: colors.text,
  },
  roleTextActive: {
    color: 'white',
  },
  inviteButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  inviteButtonDisabled: {
    opacity: 0.6,
  },
  inviteButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: 'white',
  },
});