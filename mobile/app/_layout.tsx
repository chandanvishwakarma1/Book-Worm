import SafeScreen from "@/components/SafeScreen";
import { useAuthStore } from "@/store/authStore";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from 'expo-font'
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token, isCheckingAuth } = useAuthStore();

  const [fontLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    if (!fontLoaded || isCheckingAuth) return;

    const inAuthScreen = segments[0] === '(auth)';
    const isSignedIn = user && token;

    if(!isSignedIn && !inAuthScreen) {
      router.replace('/(auth)');
    } else if(isSignedIn && inAuthScreen) {
      router.replace('/(tabs)');
    }
    
    SplashScreen.hideAsync();

  }, [user, token, segments, isCheckingAuth, fontLoaded, router])

  if (!fontLoaded || isCheckingAuth) {
    return <View />;
  }

  return( 
  <SafeAreaProvider>
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeScreen>
    <StatusBar style="dark" />
  </SafeAreaProvider>
  )
}
