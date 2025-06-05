import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Users, Plus, Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

interface FamilyMember {
  fullName: string;
  relationship: string;
  role: 'parent' | 'child';
  email: string;
}

export default function SetupFamilyScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [familyName, setFamilyName] = useState('');
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addFamilyMember = () => {
    if (members.length >= 5) {
      setError('Poți adăuga maxim 5 membri în familie');
      return;
    }
    
    setMembers([...members, {
      fullName: '',
      relationship: '',
      role: 'child',
      email: '',
    }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof FamilyMember, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: field === 'role' ? (value as 'parent' | 'child') : value,
    };
    setMembers(updatedMembers);
  };

  const handleSubmit = async () => {
    if (!familyName) {
      setError('Te rugăm să introduci numele familiei');
      return;
    }

    if (!user || !profile) {
      setError('Eroare de autentificare. Te rugăm să te reconectezi.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create family and associate current user
      const { data: familyData, error: familyError } = await supabase.rpc(
        'handle_family_setup',
        {
          p_user_id: user.id,
          p_family_name: familyName,
          p_profile_id: profile.id
        }
      );

      if (familyError) throw familyError;

      // Send invitations to family members
      for (const member of members) {
        const { error: inviteError } = await supabase.auth.signInWithOtp({
          email: member.email,
          options: {
            data: {
              full_name: member.fullName,
              role: member.role,
              family_id: familyData,
            },
          },
        });

        if (inviteError) throw inviteError;
      }

      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/7282818/pexels-photo-7282818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.title}>Configurează-ți familia</Text>
        <Text style={styles.subtitle}>Adaugă membrii familiei tale</Text>
      </View>

      <View style={styles.form}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Users size={20} color={colors.textLight} />
          <TextInput
            style={styles.input}
            placeholder="Numele familiei"
            value={familyName}
            onChangeText={setFamilyName}
            editable={!loading}
          />
        </View>

        {members.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <Text style={styles.memberTitle}>Membru {index + 1}</Text>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeMember(index)}
                disabled={loading}
              >
                <Trash2 size={20} color={colors.error} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.memberInput}
              placeholder="Nume complet"
              value={member.fullName}
              onChangeText={(value) => updateMember(index, 'fullName', value)}
              editable={!loading}
            />

            <TextInput
              style={styles.memberInput}
              placeholder="Relația cu administratorul (ex: soț/soție, copil)"
              value={member.relationship}
              onChangeText={(value) => updateMember(index, 'relationship', value)}
              editable={!loading}
            />

            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  member.role === 'parent' && styles.roleButtonActive
                ]}
                onPress={() => updateMember(index, 'role', 'parent')}
                disabled={loading}
              >
                <Text style={[
                  styles.roleButtonText,
                  member.role === 'parent' && styles.roleButtonTextActive
                ]}>Părinte</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  member.role === 'child' && styles.roleButtonActive
                ]}
                onPress={() => updateMember(index, 'role', 'child')}
                disabled={loading}
              >
                <Text style={[
                  styles.roleButtonText,
                  member.role === 'child' && styles.roleButtonTextActive
                ]}>Copil</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.memberInput}
              placeholder="Email"
              value={member.email}
              onChangeText={(value) => updateMember(index, 'email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
        ))}

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={addFamilyMember}
          disabled={members.length >= 5 || loading}
        >
          <Plus size={20} color={colors.primary} />
          <Text style={styles.addButtonText}>Adaugă membru</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.submitButton, 
            (!familyName || loading) && styles.submitButtonDisabled
          ]} 
          onPress={handleSubmit}
          disabled={!familyName || loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Finalizează configurarea</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    height: 240,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(79, 124, 172, 0.8)',
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 32,
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.error,
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
    marginLeft: 10,
  },
  memberCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  memberTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.text,
  },
  removeButton: {
    padding: 5,
  },
  memberInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.text,
  },
  roleButtons: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  roleButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: colors.primary,
  },
  roleButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
  },
  roleButtonTextActive: {
    color: colors.white,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(79, 124, 172, 0.1)',
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 20,
  },
  addButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: colors.primary,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.white,
  },
});