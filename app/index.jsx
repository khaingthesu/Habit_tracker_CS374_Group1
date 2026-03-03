import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import React, { useState } from 'react'

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const Home = () => {
  /* use the set functions later when changing */
  const [date, setDate] = useState("3/2/26");
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(5);

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
              source={{ uri: 'https://picsum.photos/id/1/200/400/?blur' } /* Replace with something */}
              style={styles.mainPic}
          />
        </View>
        <View style={styles.taskContainer}>

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
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flex: 10,
    backgroundColor: 'tan',
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
    backgroundColor: 'red',
    flex: 1,
  },
  mainPicContainer: {
    backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainPic: {
    width: 400,
    height: 200,
  },
  taskContainer: {
    backgroundColor: 'orange',
    flex: 4,
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
});