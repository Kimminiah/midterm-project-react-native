import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { fetchJobs } from '../services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type Job = {
  id: string;
  title: string;
  company: string;
  salary: string;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'JobFinder'>;
};

const JobFinderScreen: React.FC<Props> = ({ navigation }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]); // Store saved job IDs

  useEffect(() => {
    const loadJobs = async () => {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
    };
    loadJobs();
  }, []);

  const handleSaveJob = (jobId: string) => {
    if (!savedJobs.includes(jobId)) {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search jobs..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text>{item.company}</Text>
            <Text>{item.salary}</Text>
            <Button
              mode="contained"
              onPress={() => handleSaveJob(item.id)}
              style={styles.button}
            >
              {savedJobs.includes(item.id) ? 'Saved' : 'Save Job'}
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('ApplicationForm', { job: item })}
            >
              Apply
            </Button>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  jobCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  jobTitle: { fontSize: 18, fontWeight: 'bold' },
  button: { marginTop: 8 },
});

export default JobFinderScreen;