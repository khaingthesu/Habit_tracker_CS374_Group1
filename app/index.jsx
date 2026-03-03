import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox' /* use the command npx expo install expo-checkbox */

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const Home = () => {
  /* use the set functions later when changing */
  /* gotta use useState instead of state = {}, since not class component like codehs, but a function component like the vid examples */
  const [date, setDate] = useState("3/2/26");
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(5);
  const [task1, setTask1] = useState(false);
  const [task2, setTask2] = useState(false);
  const [task3, setTask3] = useState(false);
  const [task4, setTask4] = useState(false);
  const [task5, setTask5] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Habit Tracker</Text> 
          <TouchableHighlight onPress={() => alert('Logo pressed - redirect somewhere (profile?)')}>
            <Image
                source={{ uri: 'https://picsum.photos/id/237/200/300' } /* Replace image with logo later */}
                style={styles.logo}
            />
          </TouchableHighlight>
      </View>
      <View style={styles.body}>
        <View style={styles.infoContainer}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.progress}>{completed} / {total}</Text>
        </View>
        <View style={styles.mainPicContainer}>
          <Image
              source={{ uri: 'https://picsum.photos/id/1/200/400/?blur' } /* Replace with something related to tracking habits? */}
              style={styles.mainPic}
          />
        </View>
        <View style={styles.taskContainer}>
          <Text style={styles.taskTitle}>Today's Tasks:</Text> {/* somehow dynamically change later, idk how though */}
          <View style={styles.fullTask}>
            <Checkbox value={task1} onValueChange={value => {setTask1(value);}}/>
            <Text style={styles.task}>Task 1</Text>
          </View>
          <View style={styles.fullTask}>
            <Checkbox value={task2} onValueChange={value => {setTask2(value);}}/>
            <Text style={styles.task}>Task 2</Text>
          </View>
          <View style={styles.fullTask}>
            <Checkbox value={task3} onValueChange={value => {setTask3(value);}}/>
            <Text style={styles.task}>Task 3</Text>
          </View>
          <View style={styles.fullTask}>
            <Checkbox value={task4} onValueChange={value => {setTask4(value);}}/>
            <Text style={styles.task}>Task 4</Text>
          </View>
          <View style={styles.fullTask}>
            <Checkbox value={task5} onValueChange={value => {setTask5(value);}}/>
            <Text style={styles.task}>Task 5</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    width: 400,
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
    marginTop: 20,
  },
  task: {
    marginLeft: 10,
  },
});