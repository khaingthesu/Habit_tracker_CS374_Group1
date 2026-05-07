import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image, ScrollView } from 'react-native'
import React, { Component } from 'react';
import Checkbox from 'expo-checkbox';
import { Link, useFocusEffect } from 'expo-router';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

function withFocusEffect(WrappedComponent) {
  return function FocusWrapper(props) {
    const [focusKey, setFocusKey] = React.useState(0);
    useFocusEffect(
      React.useCallback(() => {
        setFocusKey((k) => k + 1);
      }, [])
    );
    return <WrappedComponent {...props} focusKey={focusKey} />;
  };
}

class Home extends Component {
  state = {
    date: new Date().toDateString(),
    lists: [],
  }

  loadLists = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.lists) {
          this.setState({ lists: data.lists });
        }
      }
    } catch (e) {
      console.log("Error loading lists:", e);
    }
  };

  saveListsToFirebase = async (lists) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    try {
      await setDoc(doc(db, "users", uid), { lists }, { merge: true });
    } catch (e) {
      console.log("Error saving:", e);
    }
  };

  toggleTaskCheck = async (listId, taskId) => {
    const newLists = this.state.lists.map(list => {
      if (list.id !== listId) return list;
      return {
        ...list,
        tasks: list.tasks?.map(task =>
          task.id === taskId ? { ...task, checked: !task.checked } : task
        )
      };
    });
    this.setState({ lists: newLists });
    await this.saveListsToFirebase(newLists);
  }

  async componentDidMount() {
    await this.loadLists();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.focusKey !== this.props.focusKey) {
      await this.loadLists();
    }
  }

  render() {
    const allTasks = this.state.lists.flatMap(list =>
      (list.tasks || []).map(task => ({ ...task, listId: list.id, listColor: list.color }))
    );

    const completed = allTasks.filter(t => t.checked).length;
    const total = allTasks.length;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Habit Tracker</Text>
          <TouchableHighlight onPress={() => alert('Logo pressed')}>
            <Image
              source={{ uri: 'https://picsum.photos/id/237/200/300' }}
              style={styles.logo}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.body}>
          <View style={styles.infoContainer}>
            <Text style={styles.date}>{this.state.date}</Text>
            <Text style={styles.progress}>Progress: {completed} / {total}</Text>
          </View>

          <View style={styles.mainPicContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/id/1/200/400/?blur' }}
              style={styles.mainPic}
            />
          </View>

          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>Upcoming Tasks:</Text>
            <ScrollView>
              {allTasks.length === 0 ? (
                <Text style={styles.noTasks}>No tasks yet. Add some in the Checklist!</Text>
              ) : (
                allTasks.map(task => (
                  <View key={task.id} style={styles.fullTask}>
                    <Checkbox
                      value={task.checked}
                      onValueChange={() => this.toggleTaskCheck(task.listId, task.id)}
                    />
                    <Text style={[styles.task, task.checked && styles.taskDone]}>
                      {task.text}
                    </Text>
                    {task.dueDate ? (
                      <Text style={styles.dueDate}>📅 {task.dueDate}</Text>
                    ) : null}
                  </View>
                ))
              )}
            </ScrollView>

            <Link href="/checklist" style={styles.link}>Checklist Page</Link>
            <Link href="/calendar" style={styles.link}>Calendar Page</Link>
          </View>
        </View>
      </View>
    );
  }
}

export default withFocusEffect(Home);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flex: 1.5,
    backgroundColor: 'teal',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flex: 10,
    backgroundColor: '#E6E6FA',
  },
  title: {
    fontWeight: 'bold',
    fontSize: deviceHeight / 40,
    marginLeft: 20,
  },
  logo: {
    height: 80,
    width: 80,
    marginLeft: 'auto',
    marginRight: 20,
    borderRadius: 10,
  },
  infoContainer: {
    backgroundColor: '#E6E6FA',
    flex: 1,
  },
  mainPicContainer: {
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainPic: {
    width: deviceWidth * 0.9,
    height: 200,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  taskContainer: {
    backgroundColor: '#E6E6FA',
    flex: 4,
    marginLeft: 20,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 15,
    marginLeft: 50,
  },
  progress: {
    marginLeft: 50,
    marginBottom: 8,
    fontSize: 20,
  },
  taskTitle: {
    marginTop: 20,
    marginBottom: 15,
    borderStyle: 'dotted',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    alignSelf: 'flex-start',
  },
  fullTask: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
  },
  task: {
    marginLeft: 10,
    fontSize: 16,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  dueDate: {
    fontSize: 12,
    color: '#555',
    marginLeft: 6,
  },
  noTasks: {
    marginTop: 20,
    color: '#888',
    fontStyle: 'italic',
  },
  link: {
    marginTop: 20,
    color: 'blue',
    borderBottomWidth: 2,
    alignSelf: 'flex-start',
    borderBottomColor: 'blue',
  },
});
