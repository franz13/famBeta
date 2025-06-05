import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { supabase } from '@/lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

import logo from '../../assets/images/logo.png';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Te rugăm să completezi toate câmpurile');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.replace('/(tabs)');
    } catch (err) {
      setError('Email sau parolă incorectă');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Bine ai revenit!</Text>
          <Text style={styles.subtitle}>Conectează-te pentru a continua</Text>
        </View>

        <View style={styles.form}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Mail size={20} color={colors.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              placeholderTextColor={colors.textLight}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={colors.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Parolă"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              placeholderTextColor={colors.textLight}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Ai uitat parola?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.button, 
              (!email || !password || loading) && styles.buttonDisabled
            ]} 
            onPress={handleSignIn}
            disabled={!email || !password || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.buttonText}>Conectare</Text>
                <ArrowRight size={20} color="white" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Nu ai cont încă? </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Înregistrează-te</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 80,
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 32,
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  form: {
    padding: 24,
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.error,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.white,
    marginRight: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.white,
  },
  signupLink: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: colors.white,
    textDecorationLine: 'underline',
  },
});