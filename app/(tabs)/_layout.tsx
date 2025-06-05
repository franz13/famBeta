import { Tabs, Redirect } from 'expo-router';
import { View, StyleSheet, Image } from 'react-native';
import { Chrome as Home, SquareCheck as CheckSquare, Award, TrendingUp, User, MessageCircle, Shield } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerStyle: styles.header,
        headerTitle: () => (
          <Image
            source={require('@/assets/images/TIER1_simbol si nume_RGB-10.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        ),
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Acasă',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <Home size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Sarcini',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <CheckSquare size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Provocări',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <Award size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <MessageCircle size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="safety"
        options={{
          title: 'Siguranță',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <Shield size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Buget',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <TrendingUp size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconWrapper}>
              <User size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    height: 65,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabBarLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  tabBarItem: {
    paddingTop: 5,
  },
  tabBarIcon: {
    marginBottom: 2,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  header: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontFamily: 'Nunito-Bold',
    color: colors.primary,
    fontSize: 20,
  },
  headerLogo: {
    height: 30,
    width: 120,
  },
});