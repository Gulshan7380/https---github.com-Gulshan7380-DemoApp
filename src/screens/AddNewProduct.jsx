import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AddNewProduct = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addItem = async () => {
    try {
      // Fetching items from the API
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const items = await response.json();

      // Creating a new item
      const newItem = {title, body: description};

      // Adding the new item to the beginning of the list
      items.unshift(newItem);

      // Storing the updated items list in AsyncStorage
      await AsyncStorage.setItem('items', JSON.stringify(items));

      // Navigating back
      navigation.goBack();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Item</Text>
      </View>

      <View style={{marginTop: 30}}>
        <CustomTextInput
          placeholder={'Enter your title'}
          value={title}
          onChangeText={text => {
            setTitle(text);
          }}
        />
        <CustomTextInput
          placeholder={'Enter your description'}
          value={description}
          onChangeText={text => {
            setDescription(text);
          }}
        />
      </View>

      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={addItem}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewProduct;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  buttonContainer: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#5AB1F6',
    borderRadius: 10,
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    includeFontPadding: false,
    fontWeight: '500',
  },
});
