import * as ImagePicker from "expo-image-picker";

export async function requestCameraPermission() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  return permission.granted;
}
