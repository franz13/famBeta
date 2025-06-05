import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Wallet, PiggyBank, TrendingUp, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { BudgetCategoryCard } from '@/components/BudgetCategoryCard';
import { TransactionItem } from '@/components/TransactionItem';
import { mockBudgetData } from '@/data/mockData';

export default function BudgetScreen() {
  const [period, setPeriod] = useState('Luna aceasta');
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Sold total</Text>
        <Text style={styles.balanceAmount}>{mockBudgetData.totalBalance} lei</Text>
        
        <View style={styles.periodSelector}>
          <TouchableOpacity 
            style={[
              styles.periodButton, 
              period === 'Luna aceasta' && styles.activePeriod
            ]}
            onPress={() => setPeriod('Luna aceasta')}
          >
            <Text style={[
              styles.periodText,
              period === 'Luna aceasta' && styles.activePeriodText
            ]}>Luna aceasta</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.periodButton, 
              period === 'Ultimele 3 luni' && styles.activePeriod
            ]}
            onPress={() => setPeriod('Ultimele 3 luni')}
          >
            <Text style={[
              styles.periodText,
              period === 'Ultimele 3 luni' && styles.activePeriodText
            ]}>Ultimele 3 luni</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(145, 205, 168, 0.2)' }]}>
              <TrendingUp size={20} color={colors.success} />
            </View>
            <View>
              <Text style={styles.statLabel}>Venituri</Text>
              <Text style={styles.statValue}>{mockBudgetData.income} lei</Text>
            </View>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(255, 164, 164, 0.2)' }]}>
              <Wallet size={20} color="#FF6B6B" />
            </View>
            <View>
              <Text style={styles.statLabel}>Cheltuieli</Text>
              <Text style={styles.statValue}>{mockBudgetData.expenses} lei</Text>
            </View>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(189, 178, 229, 0.2)' }]}>
              <PiggyBank size={20} color={colors.accent} />
            </View>
            <View>
              <Text style={styles.statLabel}>Economii</Text>
              <Text style={styles.statValue}>{mockBudgetData.savings} lei</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categorii buget</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Vezi toate</Text>
          <ArrowRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesScroll}
      >
        {mockBudgetData.categories.map((category, index) => (
          <BudgetCategoryCard key={index} category={category} />
        ))}
      </ScrollView>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tranzacții recente</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Vezi toate</Text>
          <ArrowRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.transactionsContainer}>
        {mockBudgetData.transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addTransactionButton}>
          <Text style={styles.addTransactionText}>Adaugă tranzacție</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  balanceCard: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceAmount: {
    fontFamily: 'Nunito-Bold',
    fontSize: 32,
    color: 'white',
    marginTop: 5,
    marginBottom: 15,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 30,
  },
  activePeriod: {
    backgroundColor: 'white',
  },
  periodText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  activePeriodText: {
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  statLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
  },
  statValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E9EEF4',
    marginHorizontal: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: colors.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.primary,
    marginRight: 5,
  },
  categoriesScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  addTransactionButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addTransactionText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: 'white',
  },
});