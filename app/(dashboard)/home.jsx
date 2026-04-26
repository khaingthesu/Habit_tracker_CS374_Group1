import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox' /* use the command npx expo install expo-checkbox */
import { Link } from 'expo-router'; /* for temp link to checklist */
import { Scrollbar } from 'react-scrollbars-custom'
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
          <Text style={styles.progress}>Progress: {completed} / {total}</Text>
        </View>
        <View style={styles.mainPicContainer}>
          <Image
              source={{ uri: 'https://picsum.photos/id/1/200/400/?blur' } /* Replace with something related to tracking habits? */}
              style={styles.mainPic}
          />
        </View>
               <View style={styles.lowerpart}> 
   

        <View style={styles.taskContainer}>
          <Text style={styles.taskTitle}>Today's Tasks:</Text> {/* somehow dynamically change later, idk how though */}
          <Scrollbar style={styles.tscroll}>
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
          </Scrollbar>
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
  tscroll:{
    alignItems: 'center',
    height: deviceHeight / 5,
    Width:  deviceWidth/ 5,
   


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
  fullTask:{
      flexDirection: 'row',
    backgroundColor: '#fef2bf',
     borderStyle: 'dotted',
     
    width: deviceHeight / 10,
    margin: deviceHeight/100,
    borderBottomWidth: deviceHeight / 200,

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
      alignItems: 'center',

    backgroundColor: '#E6E6FA',
    flex: 1,
  },
  mainPicContainer: {
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerpart:{
 backgroundColor: '#fef2bf',
  },
  mainPic: {
    
      marginBottom: deviceHeight/50,
    width: deviceWidth/4,
    height: deviceHeight/4,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  taskContainer: {
  
    marginLeft: deviceWidth/2.2,
    width: deviceWidth,
    height: deviceHeight/2,
    
   
  },
  date: {
    fontWeight: 'bold',
  fontSize: deviceHeight / 40,

   
    marginBottom:deviceHeight / 40,
  },
  progress: {
    marginLeft: 50,
    marginBottom: 8,
    fontSize: 20,
  },
  taskTitle: {

     right: deviceWidth/20,
    backgroundColor: '#fef2bf',
     fontSize: deviceHeight / 40,
    width: deviceHeight / 6,
    margin: deviceHeight/100,
    borderBottomWidth: deviceHeight / 200,
  },
  
  task: {
    fontSize: deviceHeight / 50,
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
