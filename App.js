import React, { useEffect, useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Entypo } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      setAppIsReady(true);
    }
  }, [loaded, error]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      colors={['#b8e1fc', '#a9d2f3', '#90bae4', '#90bff0', '#6ba8e5', '#a2daf5', '#bdf3fd']}
      style={styles.container}
    
    >
       <LoginScreen/>
       <StatusBar style='auto'/>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:25
  },
});
