import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

const JOBS_DATA = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Corp',
    salary: '$90,000',
    description: 'Build React Native apps'
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'Design Studio',
    salary: '$85,000',
    description: 'Create beautiful interfaces'
  }
];

export default function SavedJobsScreen({ navigation, savedJobs, setSavedJobs }) {
  const removeJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Saved Jobs ({savedJobs.length})</Text>
      
      {savedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't saved any jobs yet</Text>
          <Button 
            title="Browse Jobs" 
            onPress={() => navigation.navigate('JobFinder')}
          />
        </View>
      ) : (
        <FlatList
          data={JOBS_DATA.filter(job => savedJobs.includes(job.id))}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.company}>{item.company} • {item.salary}</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.applyButton]}
                  onPress={() => navigation.navigate('ApplicationForm', { 
                    job: item,
                    returnScreen: 'SavedJobs'
                  })}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.removeButton]}
                  onPress={() => removeJob(item.id)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#888'
  },
  jobCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  company: {
    color: '#666'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center'
  },
  applyButton: {
    backgroundColor: '#2196F3'
  },
  removeButton: {
    backgroundColor: '#F44336'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});