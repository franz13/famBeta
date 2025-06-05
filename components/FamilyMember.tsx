import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/constants/colors';

interface FamilyMemberProps {
  name: string;
  points: number;
  imageUrl: string;
  isActive?: boolean;
}

export function FamilyMember({ name, points, imageUrl, isActive = false }: FamilyMemberProps) {
  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.points}>{points} pts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  activeContainer: {
    backgroundColor: 'rgba(79, 124, 172, 0.1)',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
  },
  points: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
    marginTop: 3,
  }
});