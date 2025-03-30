import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function ApplicationForm({ navigation, route }) {
  const { job, returnScreen } = route.params;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    whyHire: ''
  });

  const handleSubmit = () => {
    Alert.alert(
      'Application Submitted',
      `Thank you ${formData.name}! Your application for ${job.title} has been received.`,
      [
        { 
          text: 'OK', 
          onPress: () => {
            setFormData({
              name: '',
              email: '',
              contact: '',
              whyHire: ''
            });
            navigation.navigate(returnScreen || 'JobFinder');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Apply for: {job.title}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={text => setFormData({...formData, name: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={text => setFormData({...formData, email: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={formData.contact}
        onChangeText={text => setFormData({...formData, contact: text})}
      />
      
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Why should we hire you?"
        multiline
        value={formData.whyHire}
        onChangeText={text => setFormData({...formData, whyHire: text})}
      />
      
      <Button title="Submit Application" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  }
});