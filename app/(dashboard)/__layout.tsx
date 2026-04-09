import { Tabs } from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
     <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          href: '/home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
       
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'calendar',
          href: '/calendar',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calculator" color={color} />,
        }}
      />
      <Tabs.Screen
        name="checlist"
        options={{
          title: 'checklist',
          href: '/checllist',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
        }}
      />
      </Tabs>
  
  )
}
