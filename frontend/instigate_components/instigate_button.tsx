import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { fetchInstigation } from "../instigate_functions/fetch_instigation";

const MOCK_MESSAGE = "1: humanities have a higher creative ceiling, 2: shut the fuck up";

export default function InstigateButton({ setSelectedImage }) {
    const [instigation, setInstigation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInstigation = async () => {
        setIsLoading(true);
        setError(null);
        const result = await fetchInstigation(MOCK_MESSAGE);
        console.log(result);
        setIsLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            setInstigation(result.instigation);
        }
    };

    // Function to handle image selection
    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            setError("Permission to access the photo library is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setSelectedImage(pickerResult.uri);  // Set the selected image URI
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]} // Apply styles and loading state
                onPress={handleImagePick}  // Now triggers the image picker
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Upload Screenshot"}</Text>
            </TouchableOpacity>

            {/* Display the instigation result */}
            {instigation && <Text style={styles.instigationText}>{instigation}</Text>}

            {/* Display any errors */}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 100,
        marginTop: 20,
        width: 350,
        height: 90, 
        display: 'flex',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#444',  // Dark grey when the button is disabled
    },
    instigationText: {
        marginTop: 20,
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    errorText: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
});
