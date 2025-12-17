import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import styles from '../../assets/styles/create.styles'
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import styles from "../../assets/styles/create.styles";
import COLORS from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, BACKEND_API_URL } from '@env';
// import  cloudinary  from '../../lib/cloudinary';



export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState<string | null>(null); // to display the selected image
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const router = useRouter();
  const { token } = useAuthStore();
  // console.log(token)

  const pickImage = async () => {
    try {
      //request permission if needed
      if(Platform.OS !== "web"){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log("status", status);
        if(status !== "granted") {
          Alert.alert("Permission Denied", "We need camera roll permission to upload an image")
          return
        }
      }

      //luanch the image library
      const result = await  ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images", //for multiple mediaTypes ["images", "videos", "livePhotos"]
        allowsEditing: true,
        aspect: [4,3],
        quality: 0.5, // 1 for full quality. This lowers the quality of images
        base64: true,
      })

      if(!result.canceled) {
        console.log("result is here: ", result);
        setImage(result.assets[0].uri);

        //if base64 is provided, then use it
        if(result.assets[0].base64){
          setImageBase64(result.assets[0].base64)
        } else {
          //otherwise, convert it into base64
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (err) {
      console.log("Error picking image: ", err);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  }

  const handleSubmit = async () => {
    if(!title || !caption || !rating || !imageBase64) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    try {
      setLoading(true);

      //get file extension from URI or default to jpeg
      const uriParts = image ? image.split('.') : [];
      const fileExtension = uriParts.length > 0 ? uriParts[uriParts.length - 1] : 'jpeg';

      const imageType = fileExtension ? `image/${fileExtension.toLowerCase()}` : 'image/jpeg';
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;
      // console.log("imageUrl: ",imageDataUrl);

      //upload to cludinary
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

      const formData = new FormData();
      formData.append('file', imageDataUrl);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryResponse = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formData
      });

      if (!cloudinaryResponse.ok) {
          const errorData = await cloudinaryResponse.json();
          console.error("Cloudinary Error Data: ", errorData);
          throw new Error(errorData.error.message || "Failed to upload image to Cloudinary");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url; // Get the secure URL of the hosted image

      // console.log("hitting url: ", `${BACKEND_API_URL}/books`);
      const response = await fetch(`${BACKEND_API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageUrl,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        // If response is not JSON (e.g., HTML error page), create error message
        data = { message: `Server error: ${response.status} ${response.statusText}` };
      }

      if(!response.ok) throw new Error(data.message || "Something went wrong");
      setLoading(false);

      Alert.alert("Success", "Your book recommendation has been posted");
      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      router.push("/");

    } catch (error) {
      console.log("Error posting: ", error);
      Alert.alert("Error", (error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior={Platform.OS === 'ios' ? 'padding': 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite reads with others</Text>
          </View>

          <View style={styles.form}>
            {/* BOOK TITLE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* RATING */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {renderRatingPicker()}
            </View>

                        {/* Image Section - FIXED */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                   <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons
                      name="image-outline"
                      size={40}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.placeholderText}>Tap to select Image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* CAPTION */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                <Ionicons name='cloud-upload-outline' size={20} color={COLORS.white} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Share</Text>
                </>
              )}

            </TouchableOpacity>

          </View> {/* End of Form */}
        </View> {/* End of Card */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
