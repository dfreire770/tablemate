import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const AddItemDialog = ({ visible , onClose, onSave }) => {

  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSave = () => {
    if (itemName && itemPrice) {
      onSave({ name: itemName, price: parseFloat(itemPrice) });
      setItemName('');
      setItemPrice('');
      onClose();
    } else {
      alert('Please fill out both fields.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.dialogContainer}>
        <Text style={styles.dialogTitle}>Add Item</Text>

        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
        />

        <TextInput
          style={styles.input}
          placeholder="Price"
          value={itemPrice}
          keyboardType="numeric"
          onChangeText={setItemPrice}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 14,
  },
});

export default AddItemDialog;
