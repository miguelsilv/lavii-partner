import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigations/RootNavigator";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "@/contexts/Auth";
import { ApiResourceProvider } from "@/providers/ApiResourceProvider";
import { GlobalErrorBoundary } from "@/global/appErrorBoundary";
import AppHttpErrorInterceptor from "@/global/appHttpErrorInterceptor";
import NoAuthNavigator from "@/navigations/NoAuthNavigator";
import { useCallback, useEffect, useState } from "react";
import { loadAppFonts } from "@/global/appFontLoader";
import { primaryColor } from "@lavii/ds";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Provider } from "react-redux";
import store from "@/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";

function AppContent() {
  const { isAuthenticated, data, signOut } = useAuth();

  // Cria o interceptor com signOut
  const interceptor = React.useMemo(() => new AppHttpErrorInterceptor(signOut), [signOut]);

  return (
    <GlobalErrorBoundary signOut={signOut}>
      <ApiResourceProvider token={data?.token} interceptor={interceptor}>
        <NavigationContainer>
          <BottomSheetModalProvider>
            {isAuthenticated ? <RootNavigator /> : <NoAuthNavigator />}
          </BottomSheetModalProvider>
        </NavigationContainer>
      </ApiResourceProvider>
    </GlobalErrorBoundary>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // await SplashScreen.preventAutoHideAsync();
        await loadAppFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // await SplashScreen.hideAsync();
      console.log("App is ready");
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={primaryColor} />
        <Text style={{ marginTop: 16 }}>Preparando tudo...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView onLayout={onLayoutRootView}>
          <SafeAreaProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
}
