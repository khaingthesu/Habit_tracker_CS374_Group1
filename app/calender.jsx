import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";

let deviceHeight = Dimensions.get("window").height;

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
      
      <View style={styles.header}>
        <Text style={styles.titleP}>Calendar</Text>

        <TouchableHighlight onPress={() => alert("Logo pressed - redirect to profile")}>
          <Image
            source={{ uri: "https://picsum.photos/id/237/200/300" }}
            style={styles.logo}
          />
        </TouchableHighlight>
      </View>

      
      <View style={styles.body}>
        <View style={styles.calendarBox}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            theme={{
              todayTextColor: "teal",
              arrowColor: "teal",
              textDayFontWeight: "500",
              textMonthFontWeight: "bold",
              selectedDayBackgroundColor: "teal",
              selectedDayTextColor: "white",
            }}
          />
        </View>

        <Text style={styles.note}>Tap a day to mark it done.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 1.5,
    backgroundColor: "teal",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  titleP: {
    fontWeight: "bold",
    fontSize: deviceHeight / 30,
    color: "black",
  },

  logo: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },

  body: {
    flex: 10,
    backgroundColor: "#E6E6FA",
    paddingHorizontal: 15,
    paddingTop: 20,
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
