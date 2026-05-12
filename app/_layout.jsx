import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerStyle: { backgroundColor: '#ece8e8' },
        headerTintColor: '#1e1c1c',
    }}>

      {/* Individual Screens */}
        <Stack.Screen name="(auth)"options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: "Log In/Sign Up " }} />
        <Stack.Screen name="home" options={{ title: "HomePage" }} />
        <Stack.Screen name="checklist" options={{ title: "Checklist"}} />
        <Stack.Screen name="calendar" options={{ title: "Calendar"}} />

    </Stack>
  )
}
