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
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

let deviceHeight = Dimensions.get("window").height;

export default function CalendarPage() {
  const [markedDates, setMarkedDates] = useState({});
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [taskText, setTaskText] = useState("");
  const [allLists, setAllLists] = useState([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) loadData();
    });
    return () => unsub();
  }, []);

  const loadData = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const lists = data.lists || [];
        setAllLists(lists);

        // Mark any date that has a task with a dueDate
        const dates = {};
        lists.forEach((list) => {
          list.tasks?.forEach((task) => {
            if (task.dueDate) {
              dates[task.dueDate] = { marked: true, dotColor: "teal" };
            }
          });
        });
        setMarkedDates(dates);
      }
    } catch (e) {
      console.log("Error loading data:", e);
    }
  };

  const getTasksForDate = (date) => {
    const tasks = [];
    allLists.forEach((list) => {
      list.tasks?.forEach((task) => {
        if (task.dueDate === date) {
          tasks.push({
            ...task,
            listTitle: list.title,
            listColor: list.color,
            listId: list.id,
          });
        }
      });
    });
    return tasks;
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
      setAllLists(existing);

      // Mark the date with a dot
      setMarkedDates((prev) => ({
        ...prev,
        [selectedDate]: { marked: true, dotColor: "teal" },
      }));

      setTaskText("");
      setAddModalVisible(false);
      setDayModalVisible(true); // go back to day view to see the new task
    } catch (e) {
      console.log("Error adding task:", e);
    }
  };

  const toggleTaskCheck = async (listId, taskId) => {
    const newLists = allLists.map((list) => {
      if (list.id !== listId) return list;
      return {
        ...list,
        tasks: list.tasks?.map((task) =>
          task.id === taskId ? { ...task, checked: !task.checked } : task
        ),
      };
    });

    setAllLists(newLists);

    const uid = auth.currentUser?.uid;
    if (!uid) return;
    try {
      await setDoc(doc(db, "users", uid), { lists: newLists }, { merge: true });
    } catch (e) {
      console.log("Error saving:", e);
    }
  };

  function onDayPress(day) {
    setSelectedDate(day.dateString);
    setDayModalVisible(true);
  }

  const tasksForSelectedDate = getTasksForDate(selectedDate);

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
        <Text style={styles.note}>Tap a day to see or add tasks.</Text>
      </View>

      {/* Day View Modal - shows tasks for that day */}
      <Modal
        visible={dayModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDayModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>📅 {selectedDate}</Text>

            {tasksForSelectedDate.length === 0 ? (
              <Text style={styles.noTasks}>No tasks for this day.</Text>
            ) : (
              <ScrollView style={styles.taskScroll}>
                {tasksForSelectedDate.map((task) => (
                  <View key={task.id} style={styles.taskRow}>
                    <TouchableOpacity
                      style={[
                        styles.checkbox,
                        task.checked && styles.checkboxChecked,
                        { borderColor: task.listColor },
                      ]}
                      onPress={() => toggleTaskCheck(task.listId, task.id)}
                    >
                      {task.checked && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                    <View style={styles.taskInfo}>
                      <Text
                        style={[
                          styles.taskText,
                          task.checked && styles.taskDone,
                        ]}
                      >
                        {task.text}
                      </Text>
                      <Text style={[styles.listLabel, { color: task.listColor }]}>
                        {task.listTitle}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDayModalVisible(false)}
              >
                <Text style={styles.cancelText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  setDayModalVisible(false);
                  setAddModalVisible(true);
                }}
              >
                <Text style={styles.addText}>+ Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Task Modal */}
      <Modal
        visible={addModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
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
                  setAddModalVisible(false);
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
  container: { flex: 1 },
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
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  taskScroll: {
    maxHeight: 250,
    marginBottom: 16,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "teal",
    borderColor: "teal",
  },
  checkmark: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  taskInfo: { flex: 1 },
  taskText: { fontSize: 16 },
  taskDone: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  listLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },
  noTasks: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginVertical: 20,
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
  cancelText: { color: "#555", fontSize: 16 },
  addBtn: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "teal",
    alignItems: "center",
  },
  addText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
