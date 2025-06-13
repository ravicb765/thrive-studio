
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph, TextInput, Button, Chip, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  icon: string;
  completed: boolean;
}

const defaultScheduleItems: ScheduleItem[] = [
  {
    id: '1',
    time: '6:00 AM',
    activity: 'Wake up',
    icon: 'https://placehold.co/96x96/fef3c7/f59e0b?text=⏰',
    completed: false
  },
  {
    id: '2',
    time: '6:15 AM',
    activity: 'Go to toilet',
    icon: 'https://placehold.co/96x96/e0f2fe/0284c7?text=🚽',
    completed: false
  },
  {
    id: '3',
    time: '6:30 AM',
    activity: 'Brush teeth',
    icon: 'https://placehold.co/96x96/e0e7ff/6366f1?text=🦷',
    completed: false
  },
  {
    id: '4',
    time: '6:45 AM',
    activity: 'Bath/Shower',
    icon: 'https://placehold.co/96x96/dbeafe/3b82f6?text=🚿',
    completed: false
  },
  {
    id: '5',
    time: '7:30 AM',
    activity: 'Breakfast',
    icon: 'https://placehold.co/96x96/fef3c7/f59e0b?text=🍳',
    completed: false
  },
  {
    id: '6',
    time: '8:00 AM',
    activity: 'Go to school',
    icon: 'https://placehold.co/96x96/dcfce7/16a34a?text=🎒',
    completed: false
  },
  {
    id: '7',
    time: '12:00 PM',
    activity: 'Lunch time',
    icon: 'https://placehold.co/96x96/fed7d7/ef4444?text=🍎',
    completed: false
  },
  {
    id: '8',
    time: '3:00 PM',
    activity: 'Snack time',
    icon: 'https://placehold.co/96x96/fef3c7/f59e0b?text=🍪',
    completed: false
  },
  {
    id: '9',
    time: '5:00 PM',
    activity: 'Play time - Evening',
    icon: 'https://placehold.co/96x96/e0f2fe/0284c7?text=⚽',
    completed: false
  },
  {
    id: '10',
    time: '8:00 PM',
    activity: 'Time to go to bed',
    icon: 'https://placehold.co/96x96/e0e7ff/6366f1?text=🛏️',
    completed: false
  },
  {
    id: '11',
    time: '8:30 PM',
    activity: 'Close your eyes and sleep',
    icon: 'https://placehold.co/96x96/f3e8ff/8b5cf6?text=😴',
    completed: false
  }
];

export default function VisualSchedulerScreen() {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(defaultScheduleItems);
  const [isParentMode, setIsParentMode] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newTime, setNewTime] = useState('');
  const [newActivity, setNewActivity] = useState('');

  const toggleCompletion = (id: string) => {
    setScheduleItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const editItem = (item: ScheduleItem) => {
    setEditingItem(item.id);
    setNewTime(item.time);
    setNewActivity(item.activity);
  };

  const saveEdit = () => {
    if (!editingItem) return;
    
    setScheduleItems(items =>
      items.map(item =>
        item.id === editingItem
          ? { ...item, time: newTime, activity: newActivity }
          : item
      )
    );
    
    setEditingItem(null);
    setNewTime('');
    setNewActivity('');
  };

  const addNewItem = () => {
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      time: '12:00 PM',
      activity: 'New Activity',
      icon: 'https://placehold.co/96x96/f3f4f6/6b7280?text=📝',
      completed: false
    };
    
    setScheduleItems([...scheduleItems, newItem]);
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this schedule item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setScheduleItems(items => items.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const resetProgress = () => {
    setScheduleItems(items =>
      items.map(item => ({ ...item, completed: false }))
    );
  };

  const completedCount = scheduleItems.filter(item => item.completed).length;
  const totalCount = scheduleItems.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="schedule" size={48} color="white" />
        <Title style={styles.title}>Daily Schedule Assistant</Title>
        <Paragraph style={styles.subtitle}>
          Follow your daily routine step by step
        </Paragraph>
        
        <View style={styles.progressContainer}>
          <Paragraph style={styles.progressText}>
            Progress: {completedCount}/{totalCount} activities completed
          </Paragraph>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${progressPercentage}%` }]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.controls}>
          <Chip
            selected={!isParentMode}
            onPress={() => setIsParentMode(false)}
            style={styles.modeChip}
          >
            Child View
          </Chip>
          <Chip
            selected={isParentMode}
            onPress={() => setIsParentMode(true)}
            style={styles.modeChip}
          >
            Parent/Teacher Mode
          </Chip>
          <Button
            mode="outlined"
            onPress={resetProgress}
            icon="refresh"
            compact
          >
            Reset Day
          </Button>
        </View>

        {scheduleItems.map((item, index) => (
          <Card 
            key={item.id} 
            style={[
              styles.scheduleCard,
              item.completed && styles.completedCard
            ]}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.itemHeader}>
                <View style={styles.timeContainer}>
                  <Title style={styles.timeText}>{item.time}</Title>
                </View>
                <View style={styles.activityContainer}>
                  <Image 
                    source={{ uri: item.icon }} 
                    style={styles.activityIcon}
                    resizeMode="cover"
                  />
                  <Paragraph style={styles.activityText}>
                    {item.activity}
                  </Paragraph>
                </View>
              </View>

              <View style={styles.itemActions}>
                <TouchableOpacity
                  onPress={() => toggleCompletion(item.id)}
                  style={[
                    styles.checkButton,
                    item.completed && styles.checkedButton
                  ]}
                >
                  <Icon 
                    name={item.completed ? "check-circle" : "radio-button-unchecked"} 
                    size={32} 
                    color={item.completed ? "#16a34a" : "#6b7280"} 
                  />
                </TouchableOpacity>

                {isParentMode && (
                  <View style={styles.parentActions}>
                    <TouchableOpacity
                      onPress={() => editItem(item)}
                      style={styles.editButton}
                    >
                      <Icon name="edit" size={24} color="#6366f1" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteItem(item.id)}
                      style={styles.deleteButton}
                    >
                      <Icon name="delete" size={24} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Card.Content>
          </Card>
        ))}

        {editingItem && (
          <Card style={styles.editCard}>
            <Card.Content>
              <Title style={styles.editTitle}>Edit Schedule Item</Title>
              <TextInput
                label="Time"
                value={newTime}
                onChangeText={setNewTime}
                style={styles.editInput}
                mode="outlined"
                placeholder="e.g., 6:00 AM"
              />
              <TextInput
                label="Activity"
                value={newActivity}
                onChangeText={setNewActivity}
                style={styles.editInput}
                mode="outlined"
                placeholder="e.g., Brush teeth"
              />
              <View style={styles.editActions}>
                <Button 
                  mode="outlined" 
                  onPress={() => setEditingItem(null)}
                  style={styles.editButton}
                >
                  Cancel
                </Button>
                <Button 
                  mode="contained" 
                  onPress={saveEdit}
                  style={styles.editButton}
                >
                  Save
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.tipsCard}>
          <Card.Content>
            <Title style={styles.tipsTitle}>Schedule Tips</Title>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Check off each activity as you complete it
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Parents can customize times and activities
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Follow the schedule to build good daily habits
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </View>

      {isParentMode && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={addNewItem}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
  },
  progressContainer: {
    marginTop: 16,
    width: '100%',
  },
  progressText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 4,
  },
  content: {
    padding: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  modeChip: {
    marginRight: 8,
  },
  scheduleCard: {
    elevation: 2,
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  itemHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    width: 80,
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkButton: {
    padding: 8,
  },
  checkedButton: {
    backgroundColor: '#f0fdf4',
    borderRadius: 20,
  },
  parentActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  editButton: {
    padding: 8,
    marginRight: 4,
  },
  deleteButton: {
    padding: 8,
  },
  editCard: {
    elevation: 4,
    marginBottom: 16,
    backgroundColor: '#fef3c7',
  },
  editTitle: {
    fontSize: 18,
    color: '#d97706',
    marginBottom: 16,
  },
  editInput: {
    marginBottom: 12,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  tipsCard: {
    elevation: 2,
    marginTop: 16,
  },
  tipsTitle: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    color: '#6b7280',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6366f1',
  },
});
