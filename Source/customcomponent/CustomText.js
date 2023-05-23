/*Custom Text*/
import React from 'react';
import {Text, StyleSheet} from 'react-native';
const CustomText = props => {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: props.textFont,
          fontWeight: props.textFontweight,
          padding: props.padding,
          margin: props.margin,
          flex: props.flex,
        },
      ]}>
      {props.text}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    flexWrap: 'wrap',
  },
});
export default CustomText;
