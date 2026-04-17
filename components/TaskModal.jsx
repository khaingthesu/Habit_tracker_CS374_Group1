import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';

export default class TaskModal extends Component {
  render() {
    let visible = this.props.visible;
    let onClose = this.props.onClose;
    let task = this.props.task;
    
    if (task === null || task === undefined) {
      return null;
    }

    let titleText = 'No Title';
    if (task.text) {
      titleText = task.text;
    }

    let descriptionText = 'None';
    if (task.notes) {
      if (task.notes.trim() !== '') {
        descriptionText = task.notes;
      }
    }

    let dueTimeText = 'None';
    if (task.dueTime) {
      if (task.dueTime.trim() !== '') {
        dueTimeText = task.dueTime;
      }
    }

    let dueDateText = 'None';
    if (task.dueDate) {
      if (task.dueDate.trim() !== '') {
        dueDateText = task.dueDate;
      }
    }

    return (
      <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Task Details</Text>
            
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Title</Text>
              <Text style={styles.value}>{titleText}</Text>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.value}>{descriptionText}</Text>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.label}>Due Time</Text>
              <Text style={styles.value}>{dueTimeText}</Text>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.label}>Due Date</Text>
              <Text style={styles.value}>{dueDateText}</Text>
            </View>

            <TouchableHighlight style={styles.closeButton} underlayColor="#006666" onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
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
    padding: 25,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  detailContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 3
  },
  value: {
    fontSize: 18,
    color: '#000',
  },
  closeButton: {
    backgroundColor: 'teal',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
