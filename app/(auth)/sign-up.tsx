import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, User, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { supabase } from '@/lib/supabase';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Te rugăm să completezi toate câmpurile');
      return;
    }

    if (password !== confirmPassword) {
      setError('Parolele nu coincid');
      return;
    }

    if (password.length < 8) {
      setError('Parola trebuie să aibă cel puțin 8 caractere');
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      setError('Parola trebuie să conțină litere mari și mici, numere și caractere speciale');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (signUpError) throw signUpError;

      router.replace('/setup-family');
    } catch (err: any) {
      if (err?.message === 'User already registered') {
        setError('Acest email este deja înregistrat. Te rugăm să te conectezi sau să folosești un alt email.');
      } else {
        setError('A apărut o eroare la înregistrare. Te rugăm să încerci din nou.');
      }
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
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Creează-ți cont</Text>
        <Text style={styles.subtitle}>Alătură-te familiei FamSync</Text>
      </View>

      <View style={styles.form}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <User size={20} color={colors.textLight} />
          <TextInput
            style={styles.input}
            placeholder="Nume complet"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        </View>

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
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={20} color={colors.textLight} />
          <TextInput
            style={styles.input}
            placeholder="Confirmă parola"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <Text style={styles.passwordRequirements}>
          Parola trebuie să conțină cel puțin 8 caractere, incluzând litere mari și mici, numere și caractere speciale.
        </Text>

        <TouchableOpacity 
          style={[
            styles.button,
            (!name || !email || !password || !confirmPassword || loading) && styles.buttonDisabled
          ]} 
          onPress={handleSignUp}
          disabled={!name || !email || !password || !confirmPassword || loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text style={styles.buttonText}>Continuă</Text>
              <ArrowRight size={20} color="white" />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Ai deja cont? </Text>
          <Link href="/sign-in" asChild>
            <TouchableOpacity>
              <Text style={styles.signinLink}>Conectează-te</Text>
            </TouchableOpacity>
          </Link>
        </View>
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
  logo: {
    width: 200,
    height: 80,
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
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
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
    marginLeft: 10,
  },
  passwordRequirements: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 18,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.white,
    marginRight: 8,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  signinText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.textLight,
  },
  signinLink: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: colors.primary,
  },
});