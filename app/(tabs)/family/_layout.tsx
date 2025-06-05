import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function FamilyLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerTitleStyle: {
        fontFamily: 'Nunito-Bold',
        color: colors.primary,
        fontSize: 20,
      },
      headerShadowVisible: true,
    }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Gestionare Familie',
        }}
      />
      <Stack.Screen
        name="add-member"
        options={{
          title: 'Adaugă Membru',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}