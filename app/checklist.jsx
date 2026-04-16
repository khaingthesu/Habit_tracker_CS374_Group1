import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image, TextInput, ScrollView } from 'react-native'
import {Link, Stack} from 'expo-router'
import Checkbox from 'expo-checkbox'
import React, { Component } from 'react';  
import AddListModal from '../components/AddListModal';
import DeleteListModal from '../components/DeleteListModal';
import AddTaskModal from '../components/AddTaskModal';
import DeleteTaskModal from '../components/DeleteTaskModal';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

/* Task Group List */
export default class checklist extends Component{
  state = {
    lists: [],
    addModalVisible: false,
    deleteModalVisible: false,
    addTaskModalVisible: false,
    deleteTaskModalVisible: false,
    activeListId: null,
  }
/* Function to add group list */
  handleAddList = (title, color) => {
    const newList = {
      id: Date.now().toString(),
      title,
      color,
      tasks: []
    };
    this.setState(prevState => ({
      lists: [...prevState.lists, newList],
      addModalVisible: false
    }));
  }

  /* Function to delete group list */
  handleDeleteLists = (idsToDelete) => {
    this.setState(prevState => {
      const newLists = prevState.lists.filter(list => !idsToDelete.includes(list.id));
      return {
        lists: newLists,
        deleteModalVisible: false
      };
    });
  }

  handleAddTask = (listId, taskData) => {
    this.setState(prevState => {
      const newLists = prevState.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: [...list.tasks, { 
              id: Date.now().toString(), 
              text: taskData.taskName, 
              notes: taskData.notes,
              dueTime: taskData.dueTime,
              dueDate: taskData.dueDate,
              checked: false 
            }]
          };
        }
        return list;
      });
      return {
        lists: newLists,
        addTaskModalVisible: false,
        activeListId: null
      };
    });
  }

  handleDeleteTasks = (listId, taskIdsToDelete) => {
    this.setState(prevState => {
      const newLists = prevState.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.filter(task => !taskIdsToDelete.includes(task.id))
          };
        }
        return list;
      });
      return {
        lists: newLists,
        deleteTaskModalVisible: false,
        activeListId: null
      };
    });
  }

  /* toggle task check */
  toggleTaskCheck = (listId, taskId) => {
    this.setState(prevState => {
      const newLists = prevState.lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.map(task => {
              if (task.id === taskId) {
                return { ...task, checked: !task.checked };
              }
              return task;
            })
          };
        }
        return list;
      });
      return { lists: newLists };
    });
  }

  render() {
    // Get active list tasks if in delete tasks mode
    const activeTasks = this.state.activeListId 
      ? this.state.lists.find(l => l.id === this.state.activeListId)?.tasks || []
      : [];

    return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titleP}>Habit Tracker</Text> 
        <TouchableHighlight underlayColor="transparent" onPress={() => alert('Logo pressed - redirect to profile')}>
          <Image
            source={{ uri: 'https://picsum.photos/id/237/200/300' }}
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
            <TouchableHighlight id="delete" underlayColor="transparent" onPress={() => this.setState({ deleteModalVisible: true })}>
              <Image source={{ uri: 'https://i.fbcd.co/products/original/de18ae7d25cea00a569f391100ae56d990105791a99a2d42f35d84477a869d68.jpg' }}
                style={styles.iconImage}/>
            </TouchableHighlight>
          </View>
          <View style={styles.icon}>
            <TouchableHighlight id="add" underlayColor="transparent" onPress={() => this.setState({ addModalVisible: true })}>
              <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg' }}
                style={styles.iconImage}/>
            </TouchableHighlight>
          </View>
        </View>

        <ScrollView style={styles.listsScrollContainer} contentContainerStyle={{ alignItems: 'center' }}>
          {this.state.lists.map(list => (
            <View key={list.id} style={[styles.boxConfig, { borderColor: list.color }]}>
              <View style={[styles.boxTitleConfig, { backgroundColor: list.color }]}>
                <Text style={styles.boxTitleText}>{list.title}</Text>
                <View style={styles.listIconsContainer}>
                  <TouchableHighlight 
                    underlayColor="transparent" 
                    onPress={() => this.setState({ deleteTaskModalVisible: true, activeListId: list.id })}
                    style={styles.listIconAction}
                  >
                    <Image source={{ uri: 'https://i.fbcd.co/products/original/de18ae7d25cea00a569f391100ae56d990105791a99a2d42f35d84477a869d68.jpg' }}
                      style={styles.boxImageSmall}/>
                  </TouchableHighlight>
                  
                  <TouchableHighlight 
                    underlayColor="transparent" 
                    onPress={() => this.setState({ addTaskModalVisible: true, activeListId: list.id })}
                    style={styles.listIconAction}
                  >
                    <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg' }}
                      style={styles.boxImageSmall}/>
                  </TouchableHighlight>
                </View>
              </View>

              <View style={styles.listTasks}>
                {list.tasks.map(task => (
                  <View key={task.id} style={styles.task}>
                    <Checkbox 
                      style={styles.checkbox}
                      value={task.checked}
                      onValueChange={() => this.toggleTaskCheck(list.id, task.id)}
                    />
                    <Text style={styles.taskText}>{task.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      <AddListModal 
        visible={this.state.addModalVisible} 
        onClose={() => this.setState({ addModalVisible: false })}
        onCreate={this.handleAddList}
      />

      <DeleteListModal 
        visible={this.state.deleteModalVisible} 
        lists={this.state.lists}
        onClose={() => this.setState({ deleteModalVisible: false })}
        onDelete={this.handleDeleteLists}
      />

      <AddTaskModal 
        visible={this.state.addTaskModalVisible} 
        listId={this.state.activeListId}
        onClose={() => this.setState({ addTaskModalVisible: false, activeListId: null })}
        onCreate={this.handleAddTask}
      />

      <DeleteTaskModal 
        visible={this.state.deleteTaskModalVisible} 
        listId={this.state.activeListId}
        tasks={activeTasks}
        onClose={() => this.setState({ deleteTaskModalVisible: false, activeListId: null })}
        onDelete={this.handleDeleteTasks}
      />
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
  listsScrollContainer: {
    width: '100%',
    flex: 1,
  },
  
  boxConfig:{
    minHeight: deviceHeight/4,
    width: deviceWidth/1.5,

    borderWidth: 3,
    marginBottom: 30,
    overflow: 'hidden',
  },

  boxTitleConfig:{
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  boxTitleText:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
  },

  listIconsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  
  listIconAction: {
    marginLeft: 15,
  },

  boxImageSmall: {
    height: 32,
    width: 32,
    borderRadius: 16,
    borderWidth: 1.5,
  },

  boxImage:{
    height: 35,
    width: 35,

    borderRadius:40,
    borderWidth: 1.5,
  },

  //Boxes list of tasks
  listTasks: {
    paddingBottom: 15,
  },

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