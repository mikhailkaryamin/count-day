import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./context";

import useCachedResources from "./hooks/useCachedResources";

import Events from "./screens/Events";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppProvider>
        <SafeAreaProvider>
          <Events />
        </SafeAreaProvider>
      </AppProvider>
    );
  }
}
