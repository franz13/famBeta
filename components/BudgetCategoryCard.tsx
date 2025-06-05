import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShoppingBag, Utensils, Chrome as Home, Gift, Gamepad, Book } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface CategoryProps {
  category: {
    name: string;
    icon: string;
    color: string;
    spent: number;
    budget: number;
  };
}

export function BudgetCategoryCard({ category }: CategoryProps) {
  const percentage = (category.spent / category.budget) * 100;
  const isOverBudget = percentage > 100;
  
  const renderIcon = () => {
    const iconColor = category.color;
    const size = 24;
    
    switch (category.icon) {
      case 'shopping':
        return <ShoppingBag size={size} color={iconColor} />;
      case 'food':
        return <Utensils size={size} color={iconColor} />;
      case 'home':
        return <Home size={size} color={iconColor} />;
      case 'gifts':
        return <Gift size={size} color={iconColor} />;
      case 'games':
        return <Gamepad size={size} color={iconColor} />;
      case 'education':
        return <Book size={size} color={iconColor} />;
      default:
        return <ShoppingBag size={size} color={iconColor} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
        {renderIcon()}
      </View>
      
      <Text style={styles.categoryName}>{category.name}</Text>
      
      <View style={styles.budgetInfo}>
        <Text style={styles.spentAmount}>{category.spent} lei</Text>
        <Text style={styles.budgetAmount}>/ {category.budget} lei</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: isOverBudget ? '#FF6B6B' : category.color
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  budgetInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  spentAmount: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: colors.text,
  },
  budgetAmount: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 3,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#E9EEF4',
    borderRadius: 3,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
});