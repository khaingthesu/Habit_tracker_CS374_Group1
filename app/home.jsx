import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import React, { Component } from 'react'
import Checkbox from 'expo-checkbox' /* use the command npx expo install expo-checkbox */
import { Link } from 'expo-router'; /* for temp link to checklist */

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class Home extends Component {
  state = {
    date: new Date().toDateString(),
    total: 5,
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
  }

  render() {
    const completed =
    Number(this.state.task1) +
    Number(this.state.task2) +
    Number(this.state.task3) +
    Number(this.state.task4) +
    Number(this.state.task5);
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
            <Text style={styles.progress}>Progress: {completed} / {this.state.total}</Text>
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
              <Checkbox value={this.state.task1} onValueChange={(value) => this.setState({ task1: value })}/>
              <Text style={styles.task}>Task 1</Text>
            </View>
            <View style={styles.fullTask}>
              <Checkbox value={this.state.task2} onValueChange={(value) => this.setState({ task2: value })}/>
              <Text style={styles.task}>Task 2</Text>
            </View>
            <View style={styles.fullTask}>
              <Checkbox value={this.state.task3} onValueChange={(value) => this.setState({ task3: value })}/>
              <Text style={styles.task}>Task 3</Text>
            </View>
            <View style={styles.fullTask}>
              <Checkbox value={this.state.task4} onValueChange={(value) => this.setState({ task4: value })}/>
              <Text style={styles.task}>Task 4</Text>
            </View>
            <View style={styles.fullTask}>
              <Checkbox value={this.state.task5} onValueChange={(value) => this.setState({ task5: value })}/>
              <Text style={styles.task}>Task 5</Text>
            </View>
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
