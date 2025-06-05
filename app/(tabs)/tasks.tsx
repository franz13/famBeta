import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Plus, Filter } from 'lucide-react-native';
import { TaskCard } from '@/components/TaskCard';
import { mockTasks } from '@/data/mockData';
import { colors } from '@/constants/colors';
import { FilterChip } from '@/components/FilterChip';

export default function TasksScreen() {
  const [activeFilter, setActiveFilter] = useState('Toate');
  
  const filters = ['Toate', 'Ale mele', 'Neatribuite', 'Completate'];
  
  const filteredTasks = activeFilter === 'Toate' 
    ? mockTasks 
    : activeFilter === 'Ale mele'
    ? mockTasks.filter(task => task.assignedTo === 'Andrei')
    : activeFilter === 'Neatribuite'
    ? mockTasks.filter(task => task.assignedTo === null)
    : mockTasks.filter(task => task.isCompleted);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.tasksList}>
        {filteredTasks.map((task, index) => (
          <TaskCard key={index} task={task} showAssignee={true} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Plus size={24} color="white" />
        <Text style={styles.addButtonText}>Adaugă sarcină</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  filtersScroll: {
    flex: 1,
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
  },
  tasksList: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    position: 'absolute',
    bottom: 25,
    right: 25,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
  },
});