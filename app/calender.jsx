import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarPage() {
  const [markedDates, setMarkedDates] = useState({});

  function onDayPress(day) {
    const date = day.dateString;

    setMarkedDates((prev) => {
      const copy = { ...prev };

      
      if (copy[date]) {
        delete copy[date];
      } else {
        copy[date] = { selected: true, selectedColor: "teal" };
      }

      return copy;
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>

      <View style={styles.calendarBox}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          theme={{
            todayTextColor: "teal",
            arrowColor: "teal",
            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
          }}
        />
      </View>

      <Text style={styles.note}>Tap a day to mark it done.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  calendarBox: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  note: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 14,
  },
});
