import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerStyle: { backgroundColor: '#ece8e8' },
        headerTintColor: '#dca5a5',
    }}>

      {/* Individual Screens */}
        <Stack.Screen name="index" options={{ title: "Log In/Sign Up " }} />
        <Stack.Screen name="home" options={{ title: "HomePage" }} />
        <Stack.Screen name="checklist" options={{ title: "Checklist"}} />
        <Stack.Screen name="calender" options={{ title: "Calendar"}} />

    </Stack>
  )
}