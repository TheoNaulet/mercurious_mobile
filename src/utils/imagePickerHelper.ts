import * as ImagePicker from 'expo-image-picker';

export const handleImageSelection = async (onImageSelected) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert('La permission d\'accéder à la galerie est nécessaire.');
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
    });

    if (!pickerResult.canceled) {
        const asset = pickerResult.assets[0]; 
        const uri = asset.uri;
        const base64 = asset.base64;

        onImageSelected(uri, base64);
    }
};
