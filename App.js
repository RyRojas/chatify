import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//App Components
import WelcomeScreen from './components/welcome-screen';
import Chat from './components/chat';

const Stack = createStackNavigator();

export default function App() {
  //Remove React warnings for firebase timers
  LogBox.ignoreLogs([
    'Setting a timer',
    'Animated.event now requires',
    'Animated: `useNativeDriver`',
  ]);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
