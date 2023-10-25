import React, { useContext } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { ThemeContext } from '../../context/theme/ThemeContext';

const Background = () => {
  const { theme } = useContext(ThemeContext);
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        ...styles.background,
        backgroundColor: theme.colors.primary,
        width,
        height,
      }}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
  },
});

export default Background;
