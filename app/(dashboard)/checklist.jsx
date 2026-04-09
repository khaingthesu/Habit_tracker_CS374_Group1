import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image, TextInput} from 'react-native'
import {Link, Stack} from 'expo-router'
import Checkbox from 'expo-checkbox'
import React, { Component } from 'react';  

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class checklist extends Component{
  state = {
    task: 'Add Task',
    task2: 'Add Task'
  }

  render() {
    return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titleP}>Habit Tracker</Text> 
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

        <View style={styles.buttons}>
          <View style={styles.icon}>
            <TouchableHighlight onPress={() => alert('Edit mode pressed')}>
              <Image source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/12/16/Black-thin-line-pen-icon-Graphics-1-1-580x386.jpg' }}
                style={styles.iconImage}/>
            </TouchableHighlight>
          </View>
          <View style={styles.icon}>
            <TouchableHighlight onPress={() => alert('Delete mode pressed')}>
              <Image source={{ uri: 'https://i.fbcd.co/products/original/de18ae7d25cea00a569f391100ae56d990105791a99a2d42f35d84477a869d68.jpg' }}
                style={styles.iconImage}/>
            </TouchableHighlight>
          </View>
          <View style={styles.icon}>
            <TouchableHighlight onPress={() => alert('Add mode pressed')}>
              <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg' } }
                style={styles.iconImage}/>
            </TouchableHighlight>
          </View>
        </View>
        
   <view style={styles.vspacers}></view>


<view style={styles.spacers}></view>
<view style={styles.vspacersr}></view>  
<view style={styles.spacersr}></view>
        <View style={styles.box1}>
          <View style={styles.box1Title}>
            <Text style={styles.boxTitleText}>
              Home
            </Text>
            <TextInput 
              style={styles.taskInput}
              onChangeText = {(task) => this.setState({task})}
              value = {this.state.task}
            />
            <View style={styles.icon}>
              <TouchableHighlight onPress={() => alert('Task: "' + this.state.task + '" added!')}>
                <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg' } }
                  style={styles.boxImage}/>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.listTasks}>
            <View style={styles.task}>
              <Checkbox style={styles.checkbox}/>
              <Text style={styles.taskText}>Do dishes </Text>
            </View>
            <View style={styles.task}>
              <Checkbox style={styles.checkbox}/>
              <Text style={styles.taskText}>Laundry </Text>
            </View>
            <View style={styles.task}>
              <Checkbox style={styles.checkbox}/>
              <Text style={styles.taskText}>Grocery Shopping </Text>
            </View>
          </View>
          
        </View>
  <view style={styles.vspacers}></view>
<view style={styles.spacers}></view>
<view style={styles.vspacersr}></view>  
<view style={styles.spacersr}></view>
        <View style={styles.box2}>

          <View style={styles.box2Title}>
            <Text style={styles.boxTitleText}>
              School
            </Text>
            <TextInput 
              style={styles.taskInput}
              onChangeText = {(task2) => this.setState({task2})}
              value = {this.state.task2}
            />
            <View style={styles.icon}>
              <TouchableHighlight onPress={() => alert('Task: "' + this.state.task2 + '" added!')}>
                <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg' } }
                  style={styles.boxImage}/>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.listTasks}>
            <View style={styles.task}>
              <Checkbox style={styles.checkbox}/>
              <Text style={styles.taskText}>Do dishes </Text>
            </View>
            <View style={styles.task}>
              <Checkbox style={styles.checkbox}/>
              <Text style={styles.taskText}>Laundry </Text>
            </View>
            <View style={styles.task}>
              <Checkbox style={styles.checkbox}/>
              <Text style={styles.taskText}>Grocery Shopping </Text>
            </View>
          </View>

        </View>
      </View>

    </View>
    );
  }
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
 
 
  vspacers:{
width: deviceWidth/300,
height: deviceHeight/20,
backgroundColor: 'blue',
right: deviceWidth/3,


  },
    vspacersr:{
width: deviceWidth/300,
height: deviceHeight/40,
backgroundColor: 'red',
right: deviceWidth/3,


  },
   spacersr:{
width: deviceWidth,
height: deviceWidth/300,
backgroundColor: 'red',
marginBottom:deviceHeight/100,
  },
  spacers:{
width: deviceWidth,
height: deviceWidth/300,
backgroundColor: 'blue',
marginBottom:deviceHeight/100,
  },
  titleP: {
    fontWeight: 'bold',
    fontSize: deviceHeight / 30,
    marginLeft: 20,
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
    backgroundColor: '#fef2bf',
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

  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconImage:{
    height: 50,
    width: 50,

    borderRadius:40,
    borderWidth: 1.5,

    marginLeft: 5,
    marginRight: 5,
    marginBottom: 25,
  },

//Task boxes
  box1:{
    height: deviceHeight/4,
    width: deviceWidth/1.5,

    borderWidth: 3,
    borderColor: 'red',
    marginBottom: 30,
  },

  box1Title:{
    backgroundColor:'red',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  boxTitleText:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  taskInput:{
    width:150,
    height: 50,
    backgroundColor:'white',

    borderWidth: 2.2,
    borderRadius: 20,

    padding: 10,
    marginLeft: 18,
  },

  boxImage:{
    height: 35,
    width: 35,

    borderRadius:40,
    borderWidth: 1.5,

    marginLeft: 5,
    marginRight: 10,
  },

  box2:{
    height: deviceHeight/4,
    width: deviceWidth/1.5,

    borderWidth: 3,
    borderColor: 'green',
  },

  box2Title:{
    backgroundColor:'green',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  //Boxes list of tasks
  task:{
    marginLeft: 15,
    marginTop: 10,
    flexDirection:'row',
    alignItems: 'center',
  },

  checkbox:{
    height: 20,
    width: 20,
    marginRight: 10,
  },

  taskText:{
    fontSize: 18,
  },
});