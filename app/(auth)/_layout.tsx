import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontFamily: 'Nunito-Bold',
          fontSize: 20,
          color: colors.primary,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: 'Conectare',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: 'Înregistrare',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="setup-family"
        options={{
          title: 'Configurare Familie',
        }}
      />
    </Stack>
  );
}