import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import React, { useState } from 'react'
import {Link, Stack} from 'expo-router'
import Checkbox from 'expo-checkbox'  
import { ImageBackground } from 'react-native-web';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function checklist(){
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Stack/>
        <TouchableHighlight onPress={() => alert('Logo pressed - redirect to profile')}>
          <Image
            source={{ uri: 'https://picsum.photos/id/237/200/300' } /* Replace image with logo later */}
          style={styles.logo}
          />
        </TouchableHighlight>
      </View>

      <View style={styles.body}>

        <View style={styles.title}>
          <Text style={styles.titleText}>
            All Tasks
          </Text>
        </View>

        <View style={styles.box1}>

        </View>

        <View style={styles.box2}>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //Header elements
  header: {
    flex: 1.5,
    backgroundColor: 'teal',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    height: 80,
    width: 80,
    marginLeft: 'auto',
    marginRight: 20,
    borderRadius: 40,
  },

  //Body elements
  body: {
    flex: 10,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
  },

  title:{
    alignItems: 'center',

    borderWidth: 4,
    borderStyle: 'double',

    padding: 10,
    margin: 25,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 50,
  },
})