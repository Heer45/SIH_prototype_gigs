import * as ImagePicker from 'expo-image-picker';

export async function takePhoto(): Promise<string | null> {
  try {
    // Step 1: Request camera permission (direct request like working CameraTest)
    console.log('=== START takePhoto() ===');
    console.log('Requesting camera permission...');
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    console.log('Permission:', permission.status);

    if (permission.status !== 'granted') {
      console.log('Camera permission not granted');
      return null;
    }
    console.log('Camera permission granted, proceeding with camera launch');

    // Step 2: Launch the camera
    console.log('Immediately before launchCameraAsync()');
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    console.log('Immediately after launchCameraAsync() returned');
    console.log('Camera result received:', result);

    // Step 3: Process the result
    console.log('Processing camera result...');
    console.log('result.canceled:', result.canceled);
    console.log('result.assets exists:', result.assets ? 'YES' : 'NO');
    if (result.assets) {
      console.log('result.assets.length:', result.assets.length);
      console.log('All assets:', JSON.stringify(result.assets.map(a => ({ type: a.type, uri: a.uri, fileName: a.fileName }))));
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log('Camera result URI:', uri);
      console.log('Camera result metadata:', {
        canceled: result.canceled,
        assetsCount: result.assets.length,
        assetTypes: result.assets.map(a => ({ type: a.type, uri: a.uri, fileName: a.fileName })),
      });
      console.log('=== SUCCESS: takePhoto() returning URI ===');
      return uri;
    }
    console.log('Camera result: canceled or no assets');
    console.log('=== END takePhoto() (canceled/no-assets) ===');
    return null;
  } catch (err) {
    console.warn('Error launching camera:', err);
    console.log('=== END takePhoto() (error) ===');
    return null;
  }
}

export async function pickFromGallery(): Promise<string | null> {
  try {
    let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
      status = res.status;
    }
    if (status !== 'granted') {
      console.log('Gallery permission not granted');
      return null;
    }

    console.log('Opening gallery...');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    console.log('Gallery result received:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log('Gallery result URI:', uri);
      console.log('Gallery result metadata:', {
        canceled: result.canceled,
        assetsCount: result.assets.length,
        assetTypes: result.assets.map(a => ({ type: a.type, uri: a.uri, fileName: a.fileName })),
      });
      return uri;
    }
    console.log('Gallery result: canceled or no assets');
    return null;
  } catch (err) {
    console.warn('Error launching gallery:', err);
    return null;
  }
}
