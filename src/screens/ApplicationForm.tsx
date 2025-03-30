import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ApplicationForm({ navigation, route }) {
  const { job, returnScreen } = route.params;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    whyHire: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    whyHire: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      contact: '',
      whyHire: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
      valid = false;
    }

    if (!formData.whyHire.trim()) {
      newErrors.whyHire = 'This field is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
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
              // Reset navigation stack completely
              navigation.reset({
                index: 0,
                routes: [{ name: returnScreen || 'JobFinder' }],
              });
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Apply for: {job.title}</Text>
      
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={text => setFormData({...formData, name: text})}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={text => setFormData({...formData, email: text})}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      
      <TextInput
        style={[styles.input, errors.contact && styles.errorInput]}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={formData.contact}
        onChangeText={text => setFormData({...formData, contact: text})}
      />
      {errors.contact ? <Text style={styles.errorText}>{errors.contact}</Text> : null}
      
      <TextInput
        style={[styles.input, styles.multilineInput, errors.whyHire && styles.errorInput]}
        placeholder="Why should we hire you?"
        multiline
        value={formData.whyHire}
        onChangeText={text => setFormData({...formData, whyHire: text})}
      />
      {errors.whyHire ? <Text style={styles.errorText}>{errors.whyHire}</Text> : null}
      
      <Button 
        title="Submit Application" 
        onPress={handleSubmit}
        color="#6A0DAD"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E6FA'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4B0082'
  },
  input: {
    height: 40,
    borderColor: '#6A0DAD',
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top'
  },
  errorInput: {
    borderColor: '#FF0000'
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 10
  }
});