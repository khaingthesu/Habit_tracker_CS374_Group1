import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import React from 'react'

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const Home = () => {
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
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  body: {
    flex: 4,
    backgroundColor: 'tan',
  },
  title: {
    fontWeight: 'bold',
    fontSize: deviceHeight / 20,
    marginLeft: deviceWidth / 20,
  },
  logo: {
    height: deviceWidth / 6,
    width: deviceWidth / 6,
  },
});