import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font'; 


export default function App() {

  const [loaded] = useFonts({
    'Oswald': require('./assets/fonts/Oswald-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      <Routes />
    </NavigationContainer>
  )
}