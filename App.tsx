import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobFinderScreen from './src/screens/JobFinderScreen';
import SavedJobsScreen from './src/screens/SavedJobsScreen';
import ApplicationForm from './src/screens/ApplicationForm';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }}>
        <TouchableOpacity
          style={styles.themeToggle}
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <Text style={{ fontSize: 24 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>

        <Stack.Navigator>
          <Stack.Screen name="JobFinder">
            {props => <JobFinderScreen {...props} savedJobs={savedJobs} setSavedJobs={setSavedJobs} />}
          </Stack.Screen>
          <Stack.Screen name="SavedJobs">
            {props => <SavedJobsScreen {...props} savedJobs={savedJobs} setSavedJobs={setSavedJobs} />}
          </Stack.Screen>
          <Stack.Screen name="ApplicationForm" component={ApplicationForm} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  themeToggle: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 100,
    padding: 10
  }
});