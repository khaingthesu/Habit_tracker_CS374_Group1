import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";

export default function CalendarPage() {

  const [selectedDays, setSelectedDays] = useState({});

  const handleDayPress = (day) => {
    const date = day.dateString;

    setSelectedDays((prev) => {
      const updated = { ...prev };

      if (updated[date]) {
        delete updated[date];
      } else {
        updated[date] = { selected: true, selectedColor: "#6C63FF" };
      }

      return updated;
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Habit Calendar</Text>

      <Calendar
        markedDates={selectedDays}
        onDayPress={handleDayPress}
        theme={{
          todayTextColor: "#6C63FF",
          arrowColor: "#6C63FF",
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
});
