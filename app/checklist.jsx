import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native'
import React, { useState } from 'react'
import {Link} from 'expo-router'
import Checkbox from 'expo-checkbox'

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function checklist(){
  return (
    <View style={styles.container}>

      <View style={styles.header}>

      </View>

      <View style={styles.body}>

        <View style={styles.title}>
          <Text>
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

  header: {
    flex: 5,
    flexDirection: row,
  },
})