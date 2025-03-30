// src/screens/JobDetailsScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type Props = {
  route: RouteProp<RootStackParamList, 'JobDetails'>;
};

const JobDetailsScreen: React.FC<Props> = ({ route }) => {
  const { job } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.salary}>{job.salary}</Text>
      <Text style={styles.description}>{job.description}</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Apply Now"
          onPress={() => navigation.navigate('ApplicationForm', { job })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  company: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  salary: {
    fontSize: 16,
    color: 'green',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default JobDetailsScreen;