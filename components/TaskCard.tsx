import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CircleCheck as CheckCircle, Circle, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import ConfettiCannon from 'react-native-confetti-cannon';

interface TaskProps {
  task: {
    id: number;
    title: string;
    description?: string;
    points: number;
    dueDate?: string;
    isCompleted: boolean;
    assignedTo?: string | null;
    assigneeImage?: string;
    category?: string;
  };
  showAssignee?: boolean;
}

export function TaskCard({ task, showAssignee = false }: TaskProps) {
  const [completed, setCompleted] = useState(task.isCompleted);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      setShowConfetti(true);
      // Here you would also update the state in a real app
    }
  };

  return (
    <View style={styles.container}>
      {showConfetti && (
        <ConfettiCannon
          count={50}
          origin={{ x: 0, y: 0 }}
          autoStart={true}
          fadeOut={true}
          onAnimationEnd={() => setShowConfetti(false)}
        />
      )}
      
      <TouchableOpacity 
        style={styles.checkButton} 
        onPress={handleComplete}
        disabled={completed}
      >
        {completed ? (
          <CheckCircle size={24} color={colors.success} />
        ) : (
          <Circle size={24} color={colors.primary} />
        )}
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={[styles.title, completed && styles.completedTitle]}>
          {task.title}
        </Text>
        
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
        
        <View style={styles.metaRow}>
          {task.dueDate && (
            <View style={styles.metaItem}>
              <Clock size={14} color={colors.textLight} />
              <Text style={styles.metaText}>{task.dueDate}</Text>
            </View>
          )}
          
          <View style={styles.pointsTag}>
            <Text style={styles.pointsText}>+{task.points} puncte</Text>
          </View>
        </View>
      </View>
      
      {showAssignee && task.assignedTo && (
        <View style={styles.assigneeContainer}>
          {task.assigneeImage ? (
            <Image 
              source={{ uri: task.assigneeImage }} 
              style={styles.assigneeImage} 
            />
          ) : (
            <View style={styles.assigneeInitial}>
              <Text style={styles.initialText}>
                {task.assignedTo[0]}
              </Text>
            </View>
          )}
          <Text style={styles.assigneeName}>{task.assignedTo}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  checkButton: {
    marginRight: 15,
    paddingTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 5,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.textLight,
  },
  description: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 5,
  },
  pointsTag: {
    backgroundColor: 'rgba(79, 124, 172, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pointsText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: colors.primary,
  },
  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    top: 15,
    right: 15,
  },
  assigneeImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  assigneeInitial: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  initialText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 10,
    color: 'white',
  },
  assigneeName: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.text,
  },
});