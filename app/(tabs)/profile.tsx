import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { Users, ChevronRight, LogOut, Settings, Award, Gift } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';

export default function ProfileScreen() {
  const { profile, loading, error } = useProfile();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/sign-in');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Nu s-au putut încărca datele profilului'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.replace('/sign-in')}>
          <Text style={styles.retryButtonText}>Reconectare</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={profile.avatar_url ? { uri: profile.avatar_url } : { uri: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile.full_name}</Text>
        <Text style={styles.role}>{profile.role === 'parent' ? 'Părinte' : 'Copil'}</Text>
        
        <View style={styles.pointsContainer}>
          <Award size={24} color={colors.accent} />
          <Text style={styles.pointsText}>{profile.points} puncte</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Link href="/family" asChild>
          <TouchableOpacity style={styles.optionButton}>
            <Users size={20} color={colors.text} />
            <Text style={styles.optionText}>Gestionează familia</Text>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.optionButton}>
          <Award size={20} color={colors.text} />
          <Text style={styles.optionText}>Realizările mele</Text>
          <ChevronRight size={20} color={colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Gift size={20} color={colors.text} />
          <Text style={styles.optionText}>Recompense disponibile</Text>
          <ChevronRight size={20} color={colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Settings size={20} color={colors.text} />
          <Text style={styles.optionText}>Setări profil</Text>
          <ChevronRight size={20} color={colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.signOutText}>Deconectare</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.white,
  },
  header: {
    backgroundColor: colors.white,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundDark,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: colors.text,
    marginBottom: 5,
  },
  role: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 15,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.accent}15`,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.accent,
    marginLeft: 8,
  },
  section: {
    padding: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: colors.text,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: `${colors.error}15`,
    borderRadius: 12,
    marginTop: 20,
  },
  signOutText: {
    marginLeft: 12,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: colors.error,
  },
});