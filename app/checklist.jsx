import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

let deviceHeight = Dimensions.get("window").height;

export default function CalendarPage() {
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    loadMarkedDates();
  }, []);

  const loadMarkedDates = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const lists = data.lists || [];
        const calendarList = lists.find((l) => l.id === "calendar-list");
        if (calendarList) {
          const dates = {};
          calendarList.tasks.forEach((task) => {
            if (task.dueDate) {
              dates[task.dueDate] = { selected: true, selectedColor: "teal" };
            }
          });
          setMarkedDates(dates);
        }
      }
    } catch (e) {
      console.log("Error loading calendar dates:", e);
    }
  };

  const addTaskToDate = async () => {
    if (!taskText.trim()) {
      Alert.alert("Please enter a task name.");
      return;
    }

    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const existing = docSnap.exists() ? docSnap.data().lists || [] : [];

      let calendarList = existing.find((l) => l.id === "calendar-list");

      const newTask = {
        id: Date.now().toString(),
        text: taskText.trim(),
        dueDate: selectedDate,
        checked: false,
        notes: "",
        dueTime: "",
      };

      if (calendarList) {
        calendarList.tasks = [...calendarList.tasks, newTask];
      } else {
        calendarList = {
          id: "calendar-list",
          title: "Calendar Tasks",
          color: "teal",
          tasks: [newTask],
        };
        existing.push(calendarList);
      }

      await setDoc(docRef, { lists: existing }, { merge: true });

      setMarkedDates((prev) => ({
        ...prev,
        [selectedDate]: { selected: true, selectedColor: "teal" },
      }));

      setTaskText("");
      setModalVisible(false);
      Alert.alert("Task added!", `"${newTask.text}" added for ${selectedDate}`);
    } catch (e) {
      console.log("Error adding task:", e);
    }
  };

  function onDayPress(day) {
    const date = day.dateString;
    setSelectedDate(date);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleP}>Calendar</Text>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => alert("Logo pressed - redirect to profile")}
        >
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
        <Text style={styles.note}>Tap a day to add a task.</Text>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Task for {selectedDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task name..."
              value={taskText}
              onChangeText={setTaskText}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setTaskText("");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn} onPress={addTaskToDate}>
                <Text style={styles.addText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    width: "85%",
    borderRadius: 12,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  cancelText: {
    color: "#555",
    fontSize: 16,
  },
  addBtn: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "teal",
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
