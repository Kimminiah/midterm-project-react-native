import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type Job = {
  id: string;
  title: string;
  company: string;
  salary: string;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SavedJobs'>;
};

const SavedJobsScreen: React.FC<Props> = ({ navigation }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([
    // Example saved jobs (you can replace this with global state or context)
    { id: '1', title: 'Software Engineer', company: 'TechCorp', salary: '$100k' },
    { id: '2', title: 'UX Designer', company: 'DesignCo', salary: '$80k' },
  ]);

  const handleRemoveJob = (jobId: string) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text>{item.company}</Text>
            <Text>{item.salary}</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('ApplicationForm', { job: item })}
              style={styles.button}
            >
              Apply
            </Button>
            <Button
              mode="outlined"
              onPress={() => handleRemoveJob(item.id)}
              style={styles.button}
            >
              Remove Job
            </Button>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  jobCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  jobTitle: { fontSize: 18, fontWeight: 'bold' },
  button: { marginTop: 8 },
});

export default SavedJobsScreen;