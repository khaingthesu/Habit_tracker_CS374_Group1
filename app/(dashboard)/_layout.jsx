import { Stack } from "expo-router";

import { Tabs } from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    

   
     <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
  
       
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'calendar',
          href: '/calendar',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
          <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          href: '/home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check-square" color={color} />,
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: 'checklist',
          href: '/checklist',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus-square" color={color} />,
        }}
      />
      </Tabs>
  
  )
}