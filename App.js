import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); //Mantem a tela SplashScreen

export default function App() {


  // export default function App() { // Mantenha sua linha original.

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await SplashScreen.hideAsync();
      } catch (erro) {
        console.error(erro);
      }
    }
    prepare();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar style="default" />
      <Routes />
    </NavigationContainer>
  )
}