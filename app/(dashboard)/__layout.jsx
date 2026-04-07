import { Tabs } from "expo-router"


const dashboardLayout = () => {
  return (
     <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="index" href="/home">
          Home
        </TabTrigger>
        <TabTrigger name="calender" href="/calendar">
          Calender
        </TabTrigger>
      </TabList>
    </Tabs>
  
  )
}

export default dashboardLayout