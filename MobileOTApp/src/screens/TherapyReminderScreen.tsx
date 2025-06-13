
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Chip, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TherapySession {
  id: string;
  type: string;
  therapistName: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  completed: boolean;
}

const defaultSessions: TherapySession[] = [
  {
    id: '1',
    type: 'Occupational Therapy',
    therapistName: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    time: '10:00 AM',
    location: 'Therapy Center Room 2',
    notes: 'Focus on fine motor skills',
    completed: false
  },
  {
    id: '2',
    type: 'Speech Therapy',
    therapistName: 'Ms. Emily Chen',
    date: '2024-01-17',
    time: '2:00 PM',
    location: 'Speech Clinic',
    notes: 'Articulation exercises',
    completed: false
  },
  {
    id: '3',
    type: 'Physical Therapy',
    therapistName: 'Dr. Michael Brown',
    date: '2024-01-19',
    time: '11:00 AM',
    location: 'PT Center',
    notes: 'Balance and coordination',
    completed: false
  }
];

export default function TherapyReminderScreen() {
  const [sessions, setSessions] = useState<TherapySession[]>(defaultSessions);
  const [isParentMode, setIsParentMode] = useState(false);
  const [editingSession, setEditingSession] = useState<string | null>(null);

  const markCompleted = (id: string) => {
    setSessions(sessions =>
      sessions.map(session =>
        session.id === id ? { ...session, completed: !session.completed } : session
      )
    );
  };

  const deleteSession = (id: string) => {
    Alert.alert(
      'Delete Session',
      'Are you sure you want to delete this therapy session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSessions(sessions => sessions.filter(session => session.id !== id));
          }
        }
      ]
    );
  };

  const addNewSession = () => {
    const newSession: TherapySession = {
      id: Date.now().toString(),
      type: 'New Therapy Session',
      therapistName: 'Therapist Name',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      location: 'Location',
      notes: 'Session notes',
      completed: false
    };
    
    setSessions([...sessions, newSession]);
  };

  const getSessionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'occupational therapy':
        return 'accessibility';
      case 'speech therapy':
        return 'record-voice-over';
      case 'physical therapy':
        return 'fitness-center';
      default:
        return 'healing';
    }
  };

  const upcomingSessions = sessions.filter(session => !session.completed);
  const completedSessions = sessions.filter(session => session.completed);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="event" size={48} color="white" />
        <Title style={styles.title}>Therapy Reminders</Title>
        <Paragraph style={styles.subtitle}>
          Keep track of therapy sessions and appointments
        </Paragraph>
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
        </View>

        {upcomingSessions.length > 0 && (
          <>
            <Title style={styles.sectionTitle}>Upcoming Sessions</Title>
            {upcomingSessions.map((session) => (
              <Card key={session.id} style={styles.sessionCard}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.sessionHeader}>
                    <Icon 
                      name={getSessionIcon(session.type)} 
                      size={40} 
                      color="#6366f1" 
                    />
                    <View style={styles.sessionInfo}>
                      <Title style={styles.sessionType}>{session.type}</Title>
                      <Paragraph style={styles.therapistName}>
                        with {session.therapistName}
                      </Paragraph>
                      <View style={styles.sessionDetails}>
                        <Icon name="event" size={16} color="#6b7280" />
                        <Paragraph style={styles.detailText}>
                          {session.date} at {session.time}
                        </Paragraph>
                      </View>
                      <View style={styles.sessionDetails}>
                        <Icon name="location-on" size={16} color="#6b7280" />
                        <Paragraph style={styles.detailText}>
                          {session.location}
                        </Paragraph>
                      </View>
                      <Paragraph style={styles.notes}>{session.notes}</Paragraph>
                    </View>
                  </View>

                  <View style={styles.sessionActions}>
                    <Button
                      mode="outlined"
                      onPress={() => markCompleted(session.id)}
                      icon="check"
                      compact
                    >
                      Mark Done
                    </Button>
                    {isParentMode && (
                      <Button
                        mode="text"
                        onPress={() => deleteSession(session.id)}
                        icon="delete"
                        textColor="#ef4444"
                        compact
                      >
                        Delete
                      </Button>
                    )}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </>
        )}

        {completedSessions.length > 0 && (
          <>
            <Title style={styles.sectionTitle}>Completed Sessions</Title>
            {completedSessions.map((session) => (
              <Card key={session.id} style={[styles.sessionCard, styles.completedCard]}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.sessionHeader}>
                    <Icon 
                      name="check-circle" 
                      size={40} 
                      color="#16a34a" 
                    />
                    <View style={styles.sessionInfo}>
                      <Title style={styles.sessionType}>{session.type}</Title>
                      <Paragraph style={styles.therapistName}>
                        with {session.therapistName}
                      </Paragraph>
                      <Paragraph style={styles.completedText}>
                        Completed on {session.date}
                      </Paragraph>
                    </View>
                  </View>

                  {isParentMode && (
                    <Button
                      mode="text"
                      onPress={() => markCompleted(session.id)}
                      icon="undo"
                      compact
                    >
                      Mark Pending
                    </Button>
                  )}
                </Card.Content>
              </Card>
            ))}
          </>
        )}

        <Card style={styles.tipsCard}>
          <Card.Content>
            <Title style={styles.tipsTitle}>Therapy Session Tips</Title>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Arrive 10 minutes early for sessions
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Bring any homework or exercises from previous sessions
              </Paragraph>
            </View>
            <View style={styles.tip}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Paragraph style={styles.tipText}>
                Communicate any concerns with your therapist
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </View>

      {isParentMode && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={addNewSession}
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
  content: {
    padding: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  modeChip: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#374151',
    marginBottom: 16,
    marginTop: 8,
  },
  sessionCard: {
    elevation: 2,
    marginBottom: 16,
  },
  completedCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  cardContent: {
    padding: 16,
  },
  sessionHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sessionInfo: {
    flex: 1,
    marginLeft: 16,
  },
  sessionType: {
    fontSize: 18,
    color: '#6366f1',
    marginBottom: 4,
  },
  therapistName: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  sessionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 4,
    color: '#6b7280',
    fontSize: 14,
  },
  notes: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  completedText: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  sessionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
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
