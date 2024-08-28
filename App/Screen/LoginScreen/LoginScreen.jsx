import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from './Utlis/Colors';
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        console.log("Successfully signed in!", createdSessionId);
      } else {
        // Use signIn or signUp for next steps such as MFA
        console.log("Additional steps needed", { signIn, signUp });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };
  
  
  return (
    
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <Image
        source={require('../../../assets/images/car-marker.png')} 
        style={styles.bgVideo}
        resizeMode="cover"
        repeat
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>Your Ultimate EV Charging Station Finder App</Text>
        <Text style={styles.desc}>Find EV charging station near you, plan a trip, and so much more in just one click.</Text>
        <TouchableOpacity style={styles.button}
      onPress={onPress}
        >
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit',
                fontSize:17

            }}> Login with Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain', 
  },
  bgVideo: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  heading: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: 'outfit',
    marginTop: 15,
    textAlign: 'center',
    color: Colors.Gray,
  },
  button:{
    backgroundColor:Colors.PRIMARY,
    padding:16,
    display:'flex',
    borderRadius:99,
    marginTop:40
  }
});
