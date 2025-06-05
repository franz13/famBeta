import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Award } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface AchievementProps {
  achievement: {
    id: number;
    title: string;
    icon?: string;
    color?: string;
    isLocked?: boolean;
  };
}

export function AchievementBadge({ achievement }: AchievementProps) {
  const badgeColor = achievement.color || colors.primary;
  const isLocked = achievement.isLocked || false;
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.iconContainer, 
          { backgroundColor: isLocked ? '#E9EEF4' : `${badgeColor}20` },
        ]}
      >
        {achievement.icon ? (
          <Image 
            source={{ uri: achievement.icon }} 
            style={styles.iconImage} 
          />
        ) : (
          <Award 
            size={28} 
            color={isLocked ? '#BDBDBD' : badgeColor} 
          />
        )}
      </View>
      <Text 
        style={[
          styles.title,
          isLocked && styles.lockedTitle
        ]}
      >
        {achievement.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  title: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  lockedTitle: {
    color: colors.textLight,
  },
});