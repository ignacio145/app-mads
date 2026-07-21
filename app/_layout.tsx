import {SplashScreen, Stack} from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect} from "react";
import Constants, { ExecutionEnvironment } from 'expo-constants';

import './globals.css';
import * as Sentry from '@sentry/react-native';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import useAuthStore from "@/store/auth.store";

// El auto-scroll del marquee usa scrollTo() dentro de un frame-callback; en New Architecture
// Reanimated repite el warning "scrollTo with uninitialized ref" en cada frame aunque funcione.
// Subimos el nivel del logger a error para silenciar ese ruido (se siguen viendo errores reales).
configureReanimatedLogger({ level: ReanimatedLogLevel.error, strict: false });

// Sentry usa código nativo que no existe en Expo Go y hace crashear la app.
// Lo inicializamos solo fuera de Expo Go (dev builds / producción funcionan igual).
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

if (!isExpoGo) {
  Sentry.init({
    dsn: 'https://94edd17ee98a307f2d85d750574c454a@o4506876178464768.ingest.us.sentry.io/4509588544094208',

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,

    // Configure Session Replay
    replaysSessionSampleRate: 1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
  });
}

function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser()
  }, []);

  if(!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

// En builds reales envolvemos con Sentry; en Expo Go lo exportamos tal cual.
export default isExpoGo ? RootLayout : Sentry.wrap(RootLayout);
