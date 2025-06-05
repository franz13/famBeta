import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, Plus, Gift, Trophy } from 'lucide-react-native';
import { FamilyMember } from '@/components/FamilyMember';
import { TaskCard } from '@/components/TaskCard';
import { colors } from '@/constants/colors';
import { mockTasks } from '@/data/mockData';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bună, Andrei!</Text>
        <Text style={styles.subGreeting}>Azi ai 3 misiuni de completat</Text>
      </View>

      <View style={styles.pointsCard}>
        <View style={styles.pointsContent}>
          <Text style={styles.pointsValue}>125</Text>
          <Text style={styles.pointsLabel}>Puncte</Text>
        </View>
        <View style={styles.pointsSeparator} />
        <View style={styles.pointsContent}>
          <Text style={styles.pointsValue}>3</Text>
          <Text style={styles.pointsLabel}>Realizări</Text>
        </View>
        <View style={styles.pointsSeparator} />
        <View style={styles.pointsContent}>
          <Text style={styles.pointsValue}>2</Text>
          <Text style={styles.pointsLabel}>Recompense</Text>
        </View>
      </View>

      <View style={styles.familySection}>
        <Text style={styles.sectionTitle}>Familia ta</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.familyScroll}>
          <FamilyMember 
            name="Tata" 
            points={210} 
            imageUrl="https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=300" 
          />
          <FamilyMember 
            name="Mama" 
            points={180} 
            imageUrl="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300" 
          />
          <FamilyMember 
            name="Andrei" 
            points={125} 
            imageUrl="https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300"
            isActive={true} 
          />
          <FamilyMember 
            name="Maria" 
            points={95} 
            imageUrl="https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=300" 
          />
        </ScrollView>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Plus color={colors.primary} size={24} />
          <Text style={styles.actionText}>Adaugă sarcină</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Trophy color={colors.primary} size={24} />
          <Text style={styles.actionText}>Vezi provocare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Gift color={colors.primary} size={24} />
          <Text style={styles.actionText}>Recompense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Calendar color={colors.primary} size={24} />
          <Text style={styles.actionText}>Calendar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.taskSection}>
        <Text style={styles.sectionTitle}>Sarcinile tale pentru azi</Text>
        {mockTasks.slice(0, 3).map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
        
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Vezi toate sarcinile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.challengeSection}>
        <Text style={styles.sectionTitle}>Provocarea săptămânii</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Trophy color={colors.accent} size={24} />
            <Text style={styles.challengeTitle}>Cine strânge cele mai multe jucării?</Text>
          </View>
          <Text style={styles.challengeDescription}>
            Provocare activă până duminică. Câștigătorul primește 50 de puncte și o înghețată!
          </Text>
          <View style={styles.challengeProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>Andrei: 13 jucării strânse</Text>
            <Text style={styles.progressText}>Maria: 10 jucării strânse</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  greeting: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: colors.text,
  },
  subGreeting: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.textLight,
    marginTop: 5,
  },
  pointsCard: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  pointsContent: {
    alignItems: 'center',
    flex: 1,
  },
  pointsValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: 28,
    color: 'white',
  },
  pointsLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  pointsSeparator: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: '100%',
  },
  familySection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 15,
  },
  familyScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 25,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  actionText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
  },
  taskSection: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  viewAllButton: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  viewAllText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
  challengeSection: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
  },
  challengeDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 15,
  },
  challengeProgress: {
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E9EEF4',
    borderRadius: 5,
    marginBottom: 10,
  },
  progressFill: {
    height: 10,
    backgroundColor: colors.accent,
    borderRadius: 5,
  },
  progressText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.text,
    marginTop: 5,
  },
});