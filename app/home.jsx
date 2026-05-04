import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import React, { Component } from 'react'
import Checkbox from 'expo-checkbox' /* use the command npx expo install expo-checkbox */
import { Link } from 'expo-router'; /* for temp link to checklist */

import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class Home extends Component {
  state = {
    date: new Date().toDateString(),
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
    lists: [],
  }

  async componentDidMount() {
    const uid = auth.currentUser?.uid
    if (!uid) {
      return
    }

    try {
      const docRef = doc(db,"users",uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        if(data.lists) {
          this.setState({lists: data.lists})
        }
      }
    } catch(error) {
      console.log("Error:",error)
    }
  }

  render() {
    const tasks = this.state.lists.flatMap(list => list.tasks || [])
    const total = tasks.length
    const completed = tasks.filter(task => task.checked).length

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
            <Text style={styles.date}>{this.state.date}</Text>
            <Text style={styles.progress}>Progress: {completed} / {total}</Text>
          </View>
          <View style={styles.mainPicContainer}>
            <Image
                source={{ uri: 'https://picsum.photos/id/1/200/400/?blur' } /* Replace with something related to tracking habits? */}
                style={styles.mainPic}
            />
          </View>
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>Today's Tasks:</Text> {/* dynamically change tasks, mapping from list that contains firebase info */}
            {
              tasks.map(task => (
                <View key={task.id} style={styles.fullTask}>
                  <Checkbox value={task.checked}/>
                  <Text style={styles.task}>{task.text}</Text>
                </View>
              ))
            }
            <Link href="/checklist" style={styles.link}>Checklist Page</Link>
            <Link href="/calendar" style={styles.link}>Calendar Page</Link>
          </View>
        </View>
      </View>
    )
  }
}

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
    marginTop: 20,
  },
  task: {
    marginLeft: 10,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    borderBottomWidth: 2,
    alignSelf: 'flex-start',
    borderBottomColor: 'blue',
  },
});
