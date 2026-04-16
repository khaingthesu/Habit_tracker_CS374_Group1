import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

export default class DeleteTaskModal extends Component {
  state = {
    selectedIds: new Set()
  }

  toggleSelection = (id) => {
    const newSelected = new Set(this.state.selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    this.setState({ selectedIds: newSelected });
  }

  handleDelete = () => {
    if (this.state.selectedIds.size === 0) {
      alert("No tasks selected for deletion");
      return;
    }
    this.props.onDelete(this.props.listId, Array.from(this.state.selectedIds));
    this.setState({ selectedIds: new Set() }); // Reset Selection on delete
  }

  handleClose = () => {
    this.setState({ selectedIds: new Set() });
    this.props.onClose();
  }

  render() {
    const { tasks, visible } = this.props;
    const tasksList = tasks || [];

    return (
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={this.handleClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Delete Tasks</Text>
            
            <ScrollView style={styles.listContainer}>
              {tasksList.length === 0 ? (
                <Text style={styles.emptyText}>You dont have any. Create some!</Text>
              ) : (
                tasksList.map(task => (
                  <View key={task.id} style={styles.listItem}>
                    <Checkbox
                      style={styles.checkbox}
                      value={this.state.selectedIds.has(task.id)}
                      onValueChange={() => this.toggleSelection(task.id)}
                    />
                    <Text style={styles.listTitle}>{task.text}</Text>
                  </View>
                ))
              )}
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableHighlight style={[styles.button, styles.cancelButton]} underlayColor="#bbb" onPress={this.handleClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button, styles.deleteButton]} underlayColor="#cc0000" onPress={this.handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
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
    maxHeight: '80%',
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
  listContainer: {
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  checkbox: {
    marginRight: 15,
    height: 24,
    width: 24,
  },
  listTitle: {
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
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
  deleteButton: {
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
