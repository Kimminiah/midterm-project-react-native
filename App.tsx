// App.tsx
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import JobFinderScreen from './src/screens/JobFinderScreen';
import SavedJobsScreen from './src/screens/SavedJobsScreen';
import ApplicationForm from './src/screens/ApplicationForm'; // Import ApplicationForm

// Define navigation stack params
export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  ApplicationForm: { job: Job }; // Add ApplicationForm with job parameter
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    colors: {
      primary: '#6200ee',
      background: isDarkMode ? '#121212' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#000000',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="JobFinder">
          <Stack.Screen
            name="JobFinder"
            component={JobFinderScreen}
            options={{ title: 'Job Finder', headerShown: false }}
          />
          <Stack.Screen
            name="SavedJobs"
            component={SavedJobsScreen}
            options={{ title: 'Saved Jobs', headerShown: false }}
          />
          <Stack.Screen
            name="ApplicationForm"
            component={ApplicationForm}
            options={{ title: 'Apply for Job', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}