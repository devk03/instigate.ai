import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');
const API_ADDR = "http://0.0.0.0:8080";
export const fetchInstigation = async (imageUri: any) => {
  const API_URL = `${API_ADDR}/instigate_image`;

  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg'
    } as any);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return { instigation: data.message, error: null };
  } catch (error) {
    console.error("Error in fetchInstigation():", error);
    return { instigation: null, error: "Failed to fetch instigation. Please try again." };
  }
};

const IntroPageImages = () => {
  return (
    <View style={styles.introContainer}>
      <View style={styles.bubblesContainer}>
        <Image source={require('../assets/images/backgroundpics.png')} style={styles.backgroundImage} />
        <View style={[styles.chatBubble, { transform: [{ rotate: '-5deg' }] }]}>
          <Text style={styles.chatText}>I wouldn't take that if I were you 💀</Text>
        </View>
        <View style={[styles.chatBubble, { transform: [{ rotate: '2deg' }] }]}>
          <Text style={styles.chatText}>
            That's not what you said before. Weren't you just agreeing with them?
          </Text>
        </View>
        <View style={[styles.chatBubble, { transform: [{ rotate: '-3deg' }] }]}>
          <Text style={styles.chatText}>he got yo goofy ahh good 😂😂</Text>
        </View>
      </View>
      <Text style={styles.subTitle}>Upload a screenshot of a chat to start instigating</Text>
    </View>
  );
};

export default function Index() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [instigationResult, setInstigationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    'Jua': require('../assets/fonts/Jua-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setIsLoading(true);
        const { instigation, error } = await fetchInstigation(result.assets[0].uri);
        setIsLoading(false);
        if (instigation) {
          setInstigationResult(instigation);
        } else if (error) {
          Alert.alert("Error", error);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  return (
    <LinearGradient
      colors={['#DC2913', '#F5B9B1']}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <Text style={styles.appName}>😹instigate.ai</Text>
      </View>

      {selectedImage ? (
        <View style={styles.resultContainer}>
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
          {isLoading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : instigationResult ? (
            <Text style={styles.instigationText}>{instigationResult}</Text>
          ) : null}
        </View>
      ) : (
        <IntroPageImages />
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage} disabled={isLoading}>
        <Text style={styles.uploadButtonText}>{isLoading ? "Processing..." : "Upload Image"}</Text>
      </TouchableOpacity>
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
    flex: 1,
  },
  subTitle: {
    width: '90%',
    fontSize: 24,
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
    width: width * 0.8,
    height: width * 0.6,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
    opacity: 0.6,
  },
  chatBubble: {
    backgroundColor: '#FF5A5F',
    padding: 15,
    borderRadius: 20,
    marginVertical: 15,
    alignItems: 'center',
    width: width * 0.75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  chatText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Jua',
    textAlign: 'center',
  },
  uploadedImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  uploadButton: {
    backgroundColor: '#FF5A5F',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jua',
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  instigationText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jua',
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
});