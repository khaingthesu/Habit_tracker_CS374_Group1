import { StyleSheet, Text, View, Dimensions, TouchableHighlight, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { Component } from 'react';  
import AddListModal from '../components/AddListModal';
import DeleteListModal from '../components/DeleteListModal';
import AddTaskModal from '../components/AddTaskModal';
import DeleteTaskModal from '../components/DeleteTaskModal';
import TaskModal from '../components/TaskModal';
import Checkbox from 'expo-checkbox'

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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
    taskViewModalVisible: false,
    selectedTaskToView: null,
  }

  saveListsToFirebase = async (lists) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      await setDoc(doc(db, "users", uid), {
        lists: lists
      }, { merge: true });
    } catch (e) {
      console.log("Error saving lists:", e);
    }
  };

  /* Function to add group list */
  handleAddList = async (title, color) => {
    let newList = {
      id: Date.now().toString(),
      title: title,
      color: color,
      tasks: []
    };
    
    const newLists = [...this.state.lists,newList];

    this.setState({
      lists: newLists,
      addModalVisible: false
    });

    await this.saveListsToFirebase(newLists);
  }

  /* Function to delete group list */
  handleDeleteLists = async (idsToDelete) => {
    let newLists = [];
    for (let i = 0; i < this.state.lists.length; i++) {
        let currentList = this.state.lists[i];
        let found = false;
        for (let j = 0; j < idsToDelete.length; j++) {
            if (currentList.id === idsToDelete[j]) {
                found = true;
            }
        }
        if (found === false) {
           newLists.push(currentList);
        }
    }

    this.setState({
      lists: newLists,
      deleteModalVisible: false
    });

    await this.saveListsToFirebase(newLists);
  }

  handleAddTask = async (listId, taskData) => {
    const newLists = this.state.lists.map(list => {
      if (list.id !== listId) {
        return list;
      }

      const newTask = {
        id: Date.now().toString(),
        text: taskData.taskName,
        notes: taskData.notes,
        dueTime: taskData.dueTime,
        dueDate: taskData.dueDate,
        checked: false
      }

      return {
        ...list,
        tasks: [...list.tasks,newTask]
      }
    })
        
    this.setState({
      lists: newLists,
      addTaskModalVisible: false,
      activeListId: null
    });

    await this.saveListsToFirebase(newLists);
  }

  handleDeleteTasks = async (listId, taskIdsToDelete) => {
    let newLists = [];
    for (let i = 0; i < this.state.lists.length; i++) {
      let currentList = this.state.lists[i];
      if (currentList.id === listId) {
        let keptTasks = [];
        for (let j = 0; j < currentList.tasks.length; j++) {
            let currentTask = currentList.tasks[j];
            let shouldDelete = false;
            for (let k = 0; k < taskIdsToDelete.length; k++) {
                if (currentTask.id === taskIdsToDelete[k]) {
                    shouldDelete = true;
                }
            }
            if (shouldDelete === false) {
                keptTasks.push(currentTask);
            }
        }
        let updatedList = {
            id: currentList.id,
            title: currentList.title,
            color: currentList.color,
            tasks: keptTasks
        };
        newLists.push(updatedList);
      } else {
        newLists.push(currentList);
      }
    }
    
    this.setState({
      lists: newLists,
      deleteTaskModalVisible: false,
      activeListId: null
    });

    await this.saveListsToFirebase(newLists);
  }

  /* toggle task check */
  toggleTaskCheck = async (listId, taskId) => {
    const newLists = this.state.lists.map(list => {
      if (list.id !== listId) {
        return list
      }

      return {
        ...list,
        tasks: list.tasks?.map(task =>
          task.id === taskId
            ? {...task,checked: !task.checked}
            : task
        )
      }
    });
    
    this.setState({ lists: newLists });

    await this.saveListsToFirebase(newLists);
  }

  async componentDidMount() {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.lists) {
          this.setState({ lists: data.lists });
        }
      }
    } catch (e) {
      console.log("Error loading lists:", e);
    }
  }

  render() {
    const activeList = this.state.lists.find(
      list => list.id === this.state.activeListId
    )

    const activeTasks = activeList?.tasks || []

    return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titleP}>Habit Tracker</Text> 
        <TouchableHighlight underlayColor="transparent" onPress={() => { alert('Logo pressed - redirect to profile'); }}>
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
            <TouchableHighlight id="delete" underlayColor="transparent" onPress={() => { this.setState({ deleteModalVisible: true }); }}>
              <Image source={{ uri: 'https://i.fbcd.co/products/original/de18ae7d25cea00a569f391100ae56d990105791a99a2d42f35d84477a869d68.jpg' }}
                style={styles.iconImage}/>
            </TouchableHighlight>
          </View>
          <View style={styles.icon}>
            <TouchableHighlight id="add" underlayColor="transparent" onPress={() => { this.setState({ addModalVisible: true }); }}>
              <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg' }}
                style={styles.iconImage}/>
            </TouchableHighlight>
          </View>
        </View>

        <ScrollView style={styles.listsScrollContainer} contentContainerStyle={{ alignItems: 'center' }}>
          {this.state.lists.map(list => {
            return (
              <View key={list.id} style={[styles.boxConfig, { borderColor: list.color }]}>
                <View style={[styles.boxTitleConfig, { backgroundColor: list.color }]}>
                  <Text style={styles.boxTitleText}>{list.title}</Text>
                  <View style={styles.listIconsContainer}>
                    <TouchableHighlight 
                      underlayColor="transparent" 
                      onPress={() => { this.setState({ deleteTaskModalVisible: true, activeListId: list.id }); }}
                      style={styles.listIconAction}
                    >
                      <Image source={{ uri: 'https://i.fbcd.co/products/original/de18ae7d25cea00a569f391100ae56d990105791a99a2d42f35d84477a869d68.jpg' }}
                        style={styles.boxImageSmall}/>
                    </TouchableHighlight>
                    
                    <TouchableHighlight 
                      underlayColor="transparent" 
                      onPress={() => { this.setState({ addTaskModalVisible: true, activeListId: list.id }); }}
                      style={styles.listIconAction}
                    >
                      <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg' }}
                        style={styles.boxImageSmall}/>
                    </TouchableHighlight>
                  </View>
                </View>

                <View style={styles.listTasks}>
                  {list.tasks?.map(task => {
                    return (
                      <View key={task.id} style={styles.task}>
                        <Checkbox 
                          style={styles.checkbox}
                          value={task.checked}
                          onValueChange={() => { this.toggleTaskCheck(list.id, task.id); }}
                        />
                        <TouchableOpacity 
                          style={styles.taskTouchable}
                          onPress={() => { this.setState({ taskViewModalVisible: true, selectedTaskToView: task }); }}
                        >
                          <Text style={styles.taskText}>{task.text}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      <AddListModal 
        visible={this.state.addModalVisible} 
        onClose={() => { this.setState({ addModalVisible: false }); }}
        onCreate={this.handleAddList}
      />

      <DeleteListModal 
        visible={this.state.deleteModalVisible} 
        lists={this.state.lists}
        onClose={() => { this.setState({ deleteModalVisible: false }); }}
        onDelete={this.handleDeleteLists}
      />

      <AddTaskModal 
        visible={this.state.addTaskModalVisible} 
        listId={this.state.activeListId}
        onClose={() => { this.setState({ addTaskModalVisible: false, activeListId: null }); }}
        onCreate={this.handleAddTask}
      />

      <DeleteTaskModal 
        visible={this.state.deleteTaskModalVisible} 
        listId={this.state.activeListId}
        tasks={activeTasks}
        onClose={() => { this.setState({ deleteTaskModalVisible: false, activeListId: null }); }}
        onDelete={this.handleDeleteTasks}
      />

      <TaskModal
        visible={this.state.taskViewModalVisible}
        task={this.state.selectedTaskToView}
        onClose={() => { this.setState({ taskViewModalVisible: false, selectedTaskToView: null }); }}
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

  taskTouchable: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});