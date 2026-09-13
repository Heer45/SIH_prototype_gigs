import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraTestScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testCamera = async () => {
    try {
      setLoading(true);

      console.log('=== MINIMAL NAGRIKSETU CAMERA TEST START ===');

      const permission = await ImagePicker.requestCameraPermissionsAsync();

      console.log('Permission:', permission.status);

      if (permission.status !== 'granted') {
        Alert.alert('Camera Permission Required', 'Please allow camera access for this test.');
        return;
      }

      console.log('Before launchCameraAsync()');

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      console.log('After launchCameraAsync() returned');
      console.log('Camera result:', result);

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;

        console.log('Returned URI:', uri);

        setImageUri(uri);

        Alert.alert('Camera Test Successful', 'The camera, editing/cropping, and image return all worked!');
      } else {
        console.log('Camera cancelled');
      }
    } catch (error) {
      console.error('CAMERA TEST ERROR:', error);

      Alert.alert('Camera Test Failed', String(error));
    } finally {
      setLoading(false);
      console.log('=== MINIMAL NAGRIKSETU CAMERA TEST END ===');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NagrikSetu Camera Test</Text>

      <Text style={styles.subtitle}>
        Testing Expo camera + crop/edit
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={testCamera}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Opening Camera...' : '📷 Test Camera'}
        </Text>
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.resultContainer}>
          <Text style={styles.success}>✓ Camera Test Successful</Text>

          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#667085',
    marginBottom: 32,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#2F6F57',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

  resultContainer: {
    marginTop: 32,
    alignItems: 'center',
    width: '100%',
  },

  success: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F6F57',
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: 280,
    borderRadius: 18,
  },
});