import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);

      console.log('ResponseData', responseData);
    } catch (error) {
      console.error('Show Error Message', error);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <View style={{flex:1,justifyContent: 'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#5AB1F6" />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Home</Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            style={{top: 15}}
            renderItem={({item}) => {
              return (
                <View style={styles.container}>
                  <Text style={styles.title}> Title : {item.title}</Text>
                  <Text> Description : {item.body}</Text>
                </View>
              );
            }}
          />

          <View style={styles.addButton}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AddNewProduct')}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    color: '#000',
    fontSize: 15,
  },
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
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#5AB1F6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    includeFontPadding: false,
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
    elevation: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#5AB1F6',
  },
});
