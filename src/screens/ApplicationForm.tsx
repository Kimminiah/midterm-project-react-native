// src/screens/ApplicationForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type FormData = {
  name: string;
  email: string;
  contact: string;
  whyHire: string;
};

type Props = {
  route: RouteProp<RootStackParamList, 'ApplicationForm'>;
  navigation: StackNavigationProp<RootStackParamList, 'ApplicationForm'>;
};

const ApplicationForm: React.FC<Props> = ({ route, navigation }) => {
  const { job } = route.params;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact: '',
    whyHire: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    const validationErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email format.';
    }
    if (!formData.contact.trim()) {
      validationErrors.contact = 'Contact number is required.';
    }
    if (!formData.whyHire.trim()) {
      validationErrors.whyHire = 'Please explain why we should hire you.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    Alert.alert(
      'Thank you!',
      `Your application for "${job.title}" has been submitted.`,
      [{ text: 'Okay', onPress: () => navigation.goBack() }]
    );

    setFormData({ name: '', email: '', contact: '', whyHire: '' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for "{job.title}"</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={formData.contact}
        onChangeText={(text) => setFormData({ ...formData, contact: text })}
        keyboardType="phone-pad"
      />
      {errors.contact && <Text style={styles.error}>{errors.contact}</Text>}

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Why should we hire you?"
        value={formData.whyHire}
        onChangeText={(text) => setFormData({ ...formData, whyHire: text })}
        multiline
      />
      {errors.whyHire && <Text style={styles.error}>{errors.whyHire}</Text>}

      <Button title="Submit Application" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default ApplicationForm;