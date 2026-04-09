import { Stack } from "expo-router";


export default function Layout() {
  return (
    <Stack screenOptions={{
        headerStyle: { backgroundColor: '#ece8e8' },
        headerTintColor: '#dca5a5',
    }}>

      
      
       <Stack.Screen name="(dashboard)" options={{ headerShown: false }}/>

      

    </Stack>
  );
}