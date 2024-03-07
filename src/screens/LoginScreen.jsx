import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [errorMassage, setErrorMassage] = useState({
    email: '',
    password: '',
  });

  const validForm = () => {
    let valid = true;
    const error = {};

    if (!userData.email) {
      error.email = 'Please enter your email';
      valid = false;
    }

    if (!userData.password) {
      error.password = 'Please enter your password';
      valid = false;
    }

    setErrorMassage(error);
    return valid;
  };

  const navigateNextScreen = async () => {
    const isValid = validForm();
    if (isValid) {
      try {
        await AsyncStorage.setItem('userToken', '');
        navigation.replace('HomeScreen');
      } catch (error) {
        console.error('Show login error', error);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{paddingBottom: 10}}>
        <Image
          source={require('../assets/images/Login.jpg')}
          style={{height: 300, width: '100%'}}
        />

        <View style={{marginTop: 40}}>
          <Text style={styles.textTitle}>Email</Text>
          <CustomTextInput
            placeholder={'Enter your Email'}
            value={userData.email}
            onChangeText={text => {
              setUserData({...userData, email: text});
              setErrorMassage({...errorMassage, email: ''});
            }}
          />

          {errorMassage.email && (
            <Text style={styles.errorText}>{errorMassage.email}</Text>
          )}
          <Text style={styles.textTitle}>Password</Text>
          <CustomTextInput
            placeholder={'Enter your Password'}
            value={userData.password}
            onChangeText={text => {
              setUserData({...userData, password: text});
              setErrorMassage({...errorMassage, password: ''});
            }}
          />
          {errorMassage.password && (
            <Text style={styles.errorText}>{errorMassage.password}</Text>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigateNextScreen()}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    width: '90%',
    alignSelf: 'center',
    color: '#474747',
    fontWeight: '500',
    marginTop: 15,
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
  errorText: {
    color: 'red',
    width: '90%',
    alignSelf: 'center',
    top: 5,
    fontSize: 15,
  },
});
