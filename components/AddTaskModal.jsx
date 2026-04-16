import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

export default class AddTaskModal extends Component {
  state = {
    taskName: '',
    notes: '',
    dueTime: '',
    dueDateMode: '', // 'today', 'tomorrow', 'other'
    otherDueDate: ''
  }

  handleCreate = () => {
    if (this.state.taskName.trim() === '') {
      alert('Please enter a task name');
      return;
    }

    let finalDueDate = '';
    const today = new Date();
    if (this.state.dueDateMode === 'today') {
      finalDueDate = `${today.getMonth() + 1}/${today.getDate()}`;
    } else if (this.state.dueDateMode === 'tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      finalDueDate = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`;
    } else if (this.state.dueDateMode === 'other') {
      finalDueDate = this.state.otherDueDate;
    }

    const newTaskData = {
      taskName: this.state.taskName,
      notes: this.state.notes,
      dueTime: this.state.dueTime,
      dueDate: finalDueDate
    };

    this.props.onCreate(this.props.listId, newTaskData);
    this.setState({
      taskName: '',
      notes: '',
      dueTime: '',
      dueDateMode: '',
      otherDueDate: ''
    });
  }

  handleClose = () => {
    this.setState({
      taskName: '',
      notes: '',
      dueTime: '',
      dueDateMode: '',
      otherDueDate: ''
    });
    this.props.onClose();
  }

  render() {
    return (
      <Modal visible={this.props.visible} animationType="slide" transparent={true} onRequestClose={this.handleClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add New Task</Text>
            
            <Text style={styles.label}>Task Name *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. Do dishes"
              value={this.state.taskName}
              onChangeText={(text) => this.setState({ taskName: text })}
            />

            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput 
              style={[styles.input, { height: 60 }]} 
              placeholder="Any details..."
              multiline
              value={this.state.notes}
              onChangeText={(text) => this.setState({ notes: text })}
            />

            <Text style={styles.label}>Due Time (hh:mm, Optional)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. 14:30"
              value={this.state.dueTime}
              onChangeText={(text) => this.setState({ dueTime: text })}
            />

            <Text style={styles.label}>Due Date (Optional)</Text>
            <View style={styles.dateButtonsRow}>
              <TouchableOpacity 
                style={[styles.dateButton, this.state.dueDateMode === 'today' && styles.selectedDateButton]}
                onPress={() => this.setState({ dueDateMode: 'today' })}
              >
                <Text style={[styles.dateButtonText, this.state.dueDateMode === 'today' && styles.selectedDateButtonText]}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.dateButton, this.state.dueDateMode === 'tomorrow' && styles.selectedDateButton]}
                onPress={() => this.setState({ dueDateMode: 'tomorrow' })}
              >
                <Text style={[styles.dateButtonText, this.state.dueDateMode === 'tomorrow' && styles.selectedDateButtonText]}>Tomorrow</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.dateButton, this.state.dueDateMode === 'other' && styles.selectedDateButton]}
                onPress={() => this.setState({ dueDateMode: 'other' })}
              >
                <Text style={[styles.dateButtonText, this.state.dueDateMode === 'other' && styles.selectedDateButtonText]}>Other</Text>
              </TouchableOpacity>
            </View>

            {this.state.dueDateMode === 'other' && (
              <TextInput 
                style={[styles.input, { marginTop: 10 }]} 
                placeholder="mm/dd"
                value={this.state.otherDueDate}
                onChangeText={(text) => this.setState({ otherDueDate: text })}
              />
            )}

            <View style={styles.buttonRow}>
              <TouchableHighlight style={[styles.button, styles.cancelButton]} underlayColor="#bbb" onPress={this.handleClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button, styles.createButton]} underlayColor="#006666" onPress={this.handleCreate}>
                <Text style={styles.buttonText}>Add Task</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16
  },
  dateButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    marginHorizontal: 3,
    alignItems: 'center'
  },
  selectedDateButton: {
    backgroundColor: 'teal',
    borderColor: 'teal'
  },
  dateButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500'
  },
  selectedDateButtonText: {
    color: 'white'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: '#ccc'
  },
  createButton: {
    backgroundColor: 'teal'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
