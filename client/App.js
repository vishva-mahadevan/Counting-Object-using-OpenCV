import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './src/Components/Home/HomeComponet';
import CameraComponent from './src/Components/Camera/CameraComponent';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: 'Count Objects' }} component={HomeComponent} />
        <Stack.Screen name="camera" options={{ title: 'Count Objects' }} component={CameraComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}