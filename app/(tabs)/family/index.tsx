import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Plus, Settings, UserPlus, Shield, Bell, MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Link } from 'expo-router';

const mockFamilyMembers = [
  {
    id: 1,
    name: 'Tata',
    role: 'Părinte',
    avatar: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=300',
    permissions: ['location', 'tasks', 'budget'],
  },
  {
    id: 2,
    name: 'Mama',
    role: 'Părinte',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    permissions: ['location', 'tasks', 'budget'],
  },
  {
    id: 3,
    name: 'Andrei',
    role: 'Copil',
    avatar: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
    permissions: ['location', 'tasks'],
  },
  {
    id: 4,
    name: 'Maria',
    role: 'Copil',
    avatar: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=300',
    permissions: ['location', 'tasks'],
  },
];

export default function FamilyManagementScreen() {
  const [members] = useState(mockFamilyMembers);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Gestionează membrii familiei și permisiunile lor</Text>
      </View>

      <Link href="/family/add-member" asChild>
        <TouchableOpacity style={styles.addMemberCard}>
          <View style={styles.addMemberIcon}>
            <UserPlus size={24} color={colors.primary} />
          </View>
          <Text style={styles.addMemberTitle}>Adaugă membru nou</Text>
          <Text style={styles.addMemberDescription}>
            Invită un membru al familiei să se alăture aplicației
          </Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.membersSection}>
        <Text style={styles.sectionTitle}>Membri familie</Text>
        {members.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <Image source={{ uri: member.avatar }} style={styles.avatar} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
              <TouchableOpacity style={styles.settingsButton}>
                <Settings size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.permissionsContainer}>
              <Text style={styles.permissionsTitle}>Permisiuni</Text>
              <View style={styles.permissionsList}>
                <View style={styles.permissionItem}>
                  <MapPin size={16} color={colors.text} />
                  <Text style={styles.permissionText}>Locație</Text>
                  <TouchableOpacity 
                    style={[
                      styles.toggleButton,
                      member.permissions.includes('location') && styles.toggleActive
                    ]}
                  >
                    <View style={[
                      styles.toggleCircle,
                      member.permissions.includes('location') && styles.toggleCircleActive
                    ]} />
                  </TouchableOpacity>
                </View>

                <View style={styles.permissionItem}>
                  <Bell size={16} color={colors.text} />
                  <Text style={styles.permissionText}>Notificări</Text>
                  <TouchableOpacity 
                    style={[
                      styles.toggleButton,
                      member.permissions.includes('notifications') && styles.toggleActive
                    ]}
                  >
                    <View style={[
                      styles.toggleCircle,
                      member.permissions.includes('notifications') && styles.toggleCircleActive
                    ]} />
                  </TouchableOpacity>
                </View>

                <View style={styles.permissionItem}>
                  <Shield size={16} color={colors.text} />
                  <Text style={styles.permissionText}>Control parental</Text>
                  <TouchableOpacity 
                    style={[
                      styles.toggleButton,
                      member.permissions.includes('parental') && styles.toggleActive
                    ]}
                  >
                    <View style={[
                      styles.toggleCircle,
                      member.permissions.includes('parental') && styles.toggleCircleActive
                    ]} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  addMemberCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  addMemberIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  addMemberTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 5,
  },
  addMemberDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  membersSection: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 15,
  },
  memberCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberInfo: {
    flex: 1,
    marginLeft: 15,
  },
  memberName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.text,
  },
  memberRole: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
  },
  permissionsContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 15,
  },
  permissionsTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
  },
  permissionsList: {
    gap: 10,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  permissionText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
  },
  toggleButton: {
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E9EEF4',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  toggleCircleActive: {
    transform: [{ translateX: 16 }],
  },
});