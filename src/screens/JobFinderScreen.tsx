import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { fetchJobs } from '../services/api';

type Job = {
  id: string;
  title: string;
  company: string;
  salary: string;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SavedJobs'>;
  savedJobs: string[];
  setSavedJobs: React.Dispatch<React.SetStateAction<string[]>>;
  isDarkMode: boolean;
};

const JobsFinderScreen: React.FC<Props> = ({ navigation, savedJobs, setSavedJobs, isDarkMode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const getJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
      setJobs([
        {
          id: '1',
          title: 'Frontend Developer',
          company: 'Tech Corp',
          salary: '$90,000'
        },
        {
          id: '2',
          title: 'UX Designer',
          company: 'Design Studio',
          salary: '$85,000'
        }
      ]);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#E6E6FA' }]}>
      <View style={styles.savedJobsHeader}>
        <Text style={[styles.savedJobsText, { color: isDarkMode ? '#FFFFFF' : '#4B0082' }]}>
          Saved Jobs: {savedJobs.length}
        </Text>
        {savedJobs.length > 0 && (
          <TouchableOpacity onPress={() => navigation.navigate('SavedJobs')}>
            <Text style={[styles.viewAllText, { color: isDarkMode ? '#BB86FC' : '#6A0DAD' }]}>
              View All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.jobCard, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]}>
            <Text style={[styles.jobTitle, { color: isDarkMode ? '#FFFFFF' : '#4B0082' }]}>
              {item.title}
            </Text>
            <Text style={[styles.company, { color: isDarkMode ? '#BBBBBB' : '#6A0DAD' }]}>
              {item.company}
            </Text>
            <Text style={[styles.salary, { color: isDarkMode ? '#BB86FC' : '#6A0DAD' }]}>
              {item.salary}
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button
                mode={savedJobs.includes(item.id) ? "contained" : "outlined"}
                onPress={() => handleSaveJob(item.id)}
                style={styles.button}
                color={isDarkMode ? "#BB86FC" : "#6A0DAD"}
              >
                {savedJobs.includes(item.id) ? 'Saved' : 'Save Job'}
              </Button>
              
              <Button
                mode="contained"
                onPress={() => navigation.navigate('ApplicationForm', { 
                  job: item,
                  returnScreen: 'JobFinder'
                })}
                style={styles.button}
                color={isDarkMode ? "#BB86FC" : "#6A0DAD"}
              >
                Apply
              </Button>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16
  },
  savedJobsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10
  },
  savedJobsText: {
    fontWeight: 'bold'
  },
  viewAllText: {
    textDecorationLine: 'underline'
  },
  jobCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  jobTitle: { 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  company: {
    marginTop: 4
  },
  salary: {
    marginTop: 4,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5
  }
});

export default JobsFinderScreen;