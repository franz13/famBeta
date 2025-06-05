import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Trophy, Clock, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockChallenges } from '@/data/mockData';

export default function ChallengesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Provocări active</Text>
      </View>
      
      {mockChallenges.active.map((challenge, index) => (
        <View key={index} style={styles.challengeCard}>
          <View style={styles.cardHeader}>
            <Trophy color={colors.accent} size={24} />
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
          </View>
          
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          
          <View style={styles.timeContainer}>
            <Clock size={16} color={colors.textLight} />
            <Text style={styles.timeText}>{challenge.timeLeft}</Text>
          </View>
          
          <View style={styles.participantsContainer}>
            {challenge.participants.map((participant, idx) => (
              <View key={idx} style={styles.participantRow}>
                <Image
                  source={{ uri: participant.imageUrl }}
                  style={styles.participantImage}
                />
                <Text style={styles.participantName}>{participant.name}</Text>
                <Text style={styles.participantProgress}>{participant.progress}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Vezi detalii</Text>
            <ArrowRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ))}
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activități de familie</Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activitiesScroll}>
        {mockChallenges.activities.map((activity, index) => (
          <TouchableOpacity key={index} style={styles.activityCard}>
            <Image
              source={{ uri: activity.imageUrl }}
              style={styles.activityImage}
            />
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityPoints}>+{activity.points} puncte</Text>
            <View style={styles.timeContainer}>
              <Clock size={14} color={colors.textLight} />
              <Text style={styles.activityTime}>{activity.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Istoric provocări</Text>
      </View>
      
      {mockChallenges.completed.map((challenge, index) => (
        <View key={index} style={[styles.challengeCard, styles.completedChallenge]}>
          <View style={styles.cardHeader}>
            <Trophy color={colors.success} size={24} />
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
          </View>
          
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerLabel}>Câștigător:</Text>
            <Image
              source={{ uri: challenge.winner.imageUrl }}
              style={styles.winnerImage}
            />
            <Text style={styles.winnerName}>{challenge.winner.name}</Text>
            <Text style={styles.winnerPoints}>+{challenge.winner.points} puncte</Text>
          </View>
        </View>
      ))}
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: colors.text,
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 6,
  },
  participantsContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  participantImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  participantName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
  },
  participantProgress: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: colors.primary,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 5,
  },
  viewButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.primary,
    marginRight: 5,
  },
  activitiesScroll: {
    paddingLeft: 20,
    paddingBottom: 15,
  },
  activityCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  activityImage: {
    width: '100%',
    height: 120,
  },
  activityTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.text,
    margin: 12,
    marginBottom: 5,
  },
  activityPoints: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.accent,
    marginHorizontal: 12,
  },
  activityTime: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  completedChallenge: {
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  winnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBF8',
    padding: 10,
    borderRadius: 8,
  },
  winnerLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.text,
  },
  winnerImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 8,
  },
  winnerName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  winnerPoints: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: colors.success,
  },
});