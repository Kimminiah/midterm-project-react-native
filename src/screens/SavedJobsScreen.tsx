import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Job } from '../../App';

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

export default function SavedJobsScreen({ navigation, savedJobs, setSavedJobs, isDarkMode }) {
  const removeJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId));
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#E6E6FA' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#4B0082' }]}>
        My Saved Jobs ({savedJobs.length})
      </Text>
      
      {savedJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDarkMode ? '#BBBBBB' : '#888' }]}>
            You haven't saved any jobs yet
          </Text>
          <Button 
            title="Browse Jobs" 
            onPress={() => navigation.navigate('JobFinder')}
            color={isDarkMode ? "#BB86FC" : "#6A0DAD"}
          />
        </View>
      ) : (
        <FlatList
          data={JOBS_DATA.filter(job => savedJobs.includes(job.id))}
          renderItem={({ item }) => (
            <View style={[styles.jobCard, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]}>
              <Text style={[styles.jobTitle, { color: isDarkMode ? '#FFFFFF' : '#4B0082' }]}>
                {item.title}
              </Text>
              <Text style={[styles.company, { color: isDarkMode ? '#BBBBBB' : '#666' }]}>
                {item.company} • {item.salary}
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.applyButton, 
                    { backgroundColor: isDarkMode ? '#BB86FC' : '#6A0DAD' }]}
                  onPress={() => navigation.navigate('ApplicationForm', { 
                    job: item,
                    returnScreen: 'SavedJobs'
                  })}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.removeButton, 
                    { backgroundColor: isDarkMode ? '#CF6679' : '#F44336' }]}
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
    fontSize: 16
  },
  jobCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  company: {
    marginVertical: 5
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
  applyButton: {},
  removeButton: {},
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});