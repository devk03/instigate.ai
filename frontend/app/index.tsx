import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import InstigateButton from "../instigate_components/instigate_button";

export default function Index() {

  const [fontsLoaded] = useFonts({
    'Jua': require('../assets/fonts/Jua-Regular.ttf'),  // Ensure the path is correct
  });

  if (!fontsLoaded) {
    return <View />;  // Show a loading screen until the fonts are loaded
  }

  return (
    <LinearGradient
      colors={['#DC2913', '#F5B9B1']}  // Background gradient
      style={styles.container}
    >
      {/* Top section with emoji and app name */}
      <View style={styles.topSection}>
        <Text style={styles.appName}>😹instigate.ai</Text>
      </View>

      {/* Subtitle text */}
      <Text style={styles.subTitle}>Upload a screenshot of a chat to start instigating</Text>

      {/* Chat bubbles overlaying the background */}
      <View style={styles.bubblesContainer}>
        <Image source={require('../assets/images/backgroundpics.png')} style={styles.backgroundImage} />

        {/* First chat bubble */}
        <View style={[styles.chatBubble, { transform: [{ rotate: '-5deg' }] }]}>
          <Text style={styles.chatText}>I wouldn’t take that if I were you 💀</Text>
        </View>

        {/* Second chat bubble */}
        <View style={[styles.chatBubble, { transform: [{ rotate: '2deg' }] }]}>
          <Text style={styles.chatText}>
            That’s not what you said before. Weren’t you just agreeing with them?
          </Text>
        </View>

        {/* Third chat bubble */}
        <View style={[styles.chatBubble, { transform: [{ rotate: '-3deg' }] }]}>
          <Text style={styles.chatText}>he got yo goofy ahh good 😂😂</Text>
        </View>
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <InstigateButton message="1: humanities have a higher creative ceiling, 2: shut the fuck up" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  topSection: {
    marginBottom: 20,
  },
  appName: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Jua',
  },
  subTitle: {
    width: '90%',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Jua',
    marginBottom: 20,
  },
  bubblesContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 30,
    
  },
  backgroundImage: {
    width: 360,
    height: 330,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
    opacity: 0.6,  // To blend the background image behind chat bubbles
  },
  chatBubble: {
    backgroundColor: '#FF5A5F',
    padding: 15,
    borderRadius: 20,
    marginVertical: 15,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },  // Height for vertical drop shadow
    shadowOpacity: 0.6,  // Subtle opacity for a soft shadow
    shadowRadius: 10,  // A larger radius to soften the edges
    elevation: 10,  // For Android

  },
  chatText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Jua',
    textAlign: 'center',
  },
});
