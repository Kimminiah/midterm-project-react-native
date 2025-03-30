import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobFinderScreen from './src/screens/JobFinderScreen';
import SavedJobsScreen from './src/screens/SavedJobsScreen';
import ApplicationForm from './src/screens/ApplicationForm';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#E6E6FA', // Light purple
    card: '#FFFFFF',
    text: '#4B0082', // Dark purple text
    primary: '#6A0DAD' // Purple buttons
  }
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    primary: '#BB86FC' // Purple-ish accent
  }
};

export default function App() {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <NavigationContainer theme={isDarkMode ? CustomDarkTheme : CustomLightTheme}>
      <View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : '#E6E6FA' }}>
        <TouchableOpacity
          style={styles.themeToggle}
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <Text style={{ fontSize: 24, color: isDarkMode ? '#FFFFFF' : '#4B0082' }}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>

        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
          },
          headerTintColor: isDarkMode ? '#FFFFFF' : '#4B0082'
        }}>
          <Stack.Screen name="JobFinder">
            {props => <JobFinderScreen {...props} savedJobs={savedJobs} setSavedJobs={setSavedJobs} isDarkMode={isDarkMode} />}
          </Stack.Screen>
          <Stack.Screen name="SavedJobs">
            {props => <SavedJobsScreen {...props} savedJobs={savedJobs} setSavedJobs={setSavedJobs} isDarkMode={isDarkMode} />}
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