import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {forwardRef, memo, useState} from 'react';

const CustomTextInput = (props, ref) => {
  const {placeholder, onChangeText, maxLength, value, keyboardType} =
    props;

  return (
    <View style={[styles.inputContainer]}>
      <View style={{flex: 1}}>
        <TextInput
          style={[styles.textInput]}
          {...props}
          ref={ref}
          placeholder={placeholder}
          cursorColor={'#474747'}
          placeholderTextColor={'#474747'}
          maxLength={maxLength}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default memo(forwardRef(CustomTextInput));

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 8,
  },
  textInput: {
    height: 50,
    fontSize: 18,
    color: '#474747',
    maxWidth: '85%',
    left: 12,
    fontWeight: '500',
  },
  nameInput: {
    fontSize: 20,
    color: '#474747',
    fontWeight: '500',
  },
});
