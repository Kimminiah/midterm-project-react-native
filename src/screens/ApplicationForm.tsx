// src/screens/ApplicationForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type FormData = {
  name: string;
  email: string;
  contact: string;
  whyHire: string;
};

export default function ApplicationForm() {
  const route = useRoute<RouteProp<RootStackParamList, 'ApplicationForm'>>();
  const navigation = useNavigation();
  const { job } = route.params;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact: '',
    whyHire: '',
  });

  const handleSubmit = () => {
    Alert.alert(
      'Application Submitted!',
      `Your application for ${job.title} has been received.`,
      [
        { 
          text: 'OK', 
          onPress: () => {
            navigation.navigate('SavedJobs');
            // Here you would typically save to your database/state
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Apply for: {job.title}</Text>
      <Text style={styles.jobDescription}>{job.description}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={formData.contact}
        onChangeText={(text) => setFormData({ ...formData, contact: text })}
      />
      
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Why should we hire you?"
        multiline
        value={formData.whyHire}
        onChangeText={(text) => setFormData({ ...formData, whyHire: text })}
      />
      
      <Button title="Submit Application" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  jobDescription: {
    marginBottom: 20,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});