/*Custom Button*/
import {background} from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
const CustomButton = props => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: props.buttonColor}]}
      disabled={props.disabled}
      onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#ffffff',
    padding: 15,
    margin: '5%',
    borderRadius: 15,
  },
  text: {
    color: '#ffffff',
  },
});
export default CustomButton;
