import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

const COLORS = ['#FF0000', '#008000', '#0000FF', '#FFA500', '#800080', '#FFC0CB', '#00FFFF', '#FFD700', '#A52A2A', '#808080'];

export default class AddListModal extends Component {
  state = {
    listName: '',
    selectedColor: '#FF0000'
  }

  handleCreate = () => {
    if (this.state.listName.trim() === '') {
      alert('Please enter a list name');
      return;
    }
    this.props.onCreate(this.state.listName, this.state.selectedColor);
    this.setState({ listName: '', selectedColor: '#FF0000' });
  }

  render() {
    let renderedColors = [];
    for (let i = 0; i < COLORS.length; i++) {
        let color = COLORS[i];
        
        let dynamicStyles = [styles.colorCircle, { backgroundColor: color }];
        if (this.state.selectedColor === color) {
            dynamicStyles = [styles.colorCircle, { backgroundColor: color }, styles.selectedColor];
        }

        renderedColors.push(
            <TouchableOpacity 
                key={color} 
                style={dynamicStyles} 
                onPress={() => { this.setState({ selectedColor: color }); }}
            />
        );
    }

    return (
      <Modal visible={this.props.visible} animationType="slide" transparent={true} onRequestClose={this.props.onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Create New List</Text>
            
            <Text style={styles.label}>List Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. Work, Errands..."
              value={this.state.listName}
              onChangeText={(text) => { this.setState({ listName: text }); }}
            />

            <Text style={styles.label}>Pick a Color</Text>
            <View style={styles.colorPalette}>
              {renderedColors}
            </View>

            <View style={styles.buttonRow}>
              <TouchableHighlight style={[styles.button, styles.cancelButton]} underlayColor="#bbb" onPress={this.props.onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.button, styles.createButton]} underlayColor="#006666" onPress={this.handleCreate}>
                <Text style={styles.buttonText}>Create</Text>
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
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20
  },
  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    margin: 6,
    borderWidth: 3,
    borderColor: 'transparent'
  },
  selectedColor: {
    borderColor: '#333'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
