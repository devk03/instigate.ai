import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import InstigateButton from "../instigate_components/instigate_button";

const { width } = Dimensions.get('window');

const IntroPage = () => {
  return (
    <View style={styles.introContainer}>
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
      </View>
    </View>
  );
};

export default function Index() {
  // Move the selectedImage state here
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

      {/* Conditionally render IntroPage or the selected image */}
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
      ) : (
        <IntroPage />
      )}

      <InstigateButton setSelectedImage={setSelectedImage} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Jua',
    textAlign: 'center',
  },
  introContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    width: '90%',
    fontSize: 24, // Adjusted for better readability on smaller screens
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Jua',
    marginBottom: 20,
  },
  bubblesContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 30,
  },
  backgroundImage: {
    width: width * 0.8,  // Dynamic width based on screen size
    height: width * 0.6,  // Maintain aspect ratio
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
    width: width * 0.75,  // Adjusted to fit within the screen dynamically
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },  // Adjust shadow height
    shadowOpacity: 0.3,  // Subtle opacity for a soft shadow
    shadowRadius: 8,  // A larger radius to soften the edges
    elevation: 5,  // For Android
  },
  chatText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Jua',
    textAlign: 'center',
  },
  uploadedImage: {
    marginTop: 20,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
    resizeMode: 'contain',
  },
});
