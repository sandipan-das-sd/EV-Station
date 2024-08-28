
import React, { useEffect, useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store'
SplashScreen.preventAutoHideAsync();
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}
function AuthComponent() {
  const { isSignedIn, isLoaded } = useAuth();
  
  useEffect(() => {
    console.log("Auth state:", { isSignedIn, isLoaded });
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) {
    return <Text>Loading auth state...</Text>;
  }

  return (
    <>
      <SignedIn>
        <Text>Hello You are signed in</Text>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </>
  );
}

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
    <ClerkProvider tokenCache={tokenCache}  publishableKey={'pk_test_ZW5nYWdlZC1raXR0ZW4tNjUuY2xlcmsuYWNjb3VudHMuZGV2JA'}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AuthComponent />
        <StatusBar style='auto' />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
});