import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DashboardScreen() {
  const navigation = useNavigation();

  const quickActions = [
    { title: 'Visual Scheduler', subtitle: 'Plan your day', screen: 'Scheduler' },
    { title: 'Calm Corner', subtitle: 'Relax and unwind', screen: 'Calm Corner' },
    { title: 'OT Activities', subtitle: 'Skill building tasks', screen: 'OT Activities' },
    { title: 'Yoga Zone', subtitle: 'Mindful movement', screen: 'Yoga Zone' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Welcome Back!</Title>
        <Paragraph style={styles.subtitle}>
          Ready for today's activities?
        </Paragraph>
      </View>

      <View style={styles.activities}>
        <Title style={styles.sectionTitle}>Explore</Title>
        <View style={styles.activitiesGrid}>
          <TouchableOpacity 
            style={[styles.activityCard, { backgroundColor: '#10b981' }]}
            onPress={() => navigation.navigate('Breathing Exercises')}
          >
            <Icon name="air" size={40} color="white" />
            <Text style={styles.activityTitle}>Breathing</Text>
            <Text style={styles.activitySubtitle}>Calm & Focus</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.activityCard, { backgroundColor: '#8b5cf6' }]}
            onPress={() => navigation.navigate('Fun Games')}
          >
            <Icon name="pets" size={40} color="white" />
            <Text style={styles.activityTitle}>Fun Games</Text>
            <Text style={styles.activitySubtitle}>Animal Matching</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Title style={styles.sectionTitle}>Quick Actions</Title>
        {quickActions.map((action, index) => (
          <Card key={index} style={styles.actionCard}>
            <Card.Content>
              <Title style={styles.cardTitle}>{action.title}</Title>
              <Paragraph>{action.subtitle}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate(action.screen as never)}
              >
                Open
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6366f1',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    opacity: 0.9,
  },
  quickActions: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#374151',
  },
  actionCard: {
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: '#374151',
  },
  activities: {
    padding: 16,
  },
  activitiesGrid: {
    flexDirection: 'row',
    justifyContent: 'spaceAround',
    marginBottom: 16,
  },
  activityCard: {
    width: '45%',
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 3,
  },
  activityTitle: {
    marginTop: 5,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activitySubtitle: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
});