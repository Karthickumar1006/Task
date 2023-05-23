/*Custom TextInput*/
import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
const CustomInputText = props => {
  return (
    <View style={styles.textInputView}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#000"
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInputView: {
    margin: '2%',
    padding: '3%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius:5,
  }
});
export default CustomInputText;
