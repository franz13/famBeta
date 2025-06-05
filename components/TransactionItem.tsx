import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, ShoppingBag, CreditCard, Chrome as Home, Utensils } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface TransactionProps {
  transaction: {
    id: number;
    title: string;
    amount: number;
    date: string;
    category: string;
    type: 'income' | 'expense';
  };
}

export function TransactionItem({ transaction }: TransactionProps) {
  const isIncome = transaction.type === 'income';
  
  const renderCategoryIcon = () => {
    const size = 20;
    const color = isIncome ? colors.success : '#FF6B6B';
    
    if (isIncome) {
      return <TrendingUp size={size} color={color} />;
    }
    
    switch (transaction.category) {
      case 'shopping':
        return <ShoppingBag size={size} color={color} />;
      case 'food':
        return <Utensils size={size} color={color} />;
      case 'home':
        return <Home size={size} color={color} />;
      case 'bills':
        return <CreditCard size={size} color={color} />;
      default:
        return <TrendingDown size={size} color={color} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.iconContainer,
        { backgroundColor: isIncome ? 'rgba(145, 205, 168, 0.2)' : 'rgba(255, 107, 107, 0.2)' }
      ]}>
        {renderCategoryIcon()}
      </View>
      
      <View style={styles.details}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      
      <Text style={[
        styles.amount,
        isIncome ? styles.incomeAmount : styles.expenseAmount
      ]}>
        {isIncome ? '+' : '-'}{transaction.amount} lei
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    color: colors.text,
    marginBottom: 3,
  },
  date: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
  },
  amount: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
  },
  incomeAmount: {
    color: colors.success,
  },
  expenseAmount: {
    color: '#FF6B6B',
  },
});