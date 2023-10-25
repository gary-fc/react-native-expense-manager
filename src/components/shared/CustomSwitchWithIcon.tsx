import React, { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';


const CustomSwitchWithIcon = ({ onImage, offImage, onToggle }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleSwitch = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    setIsDarkMode(!isDarkMode);
    onToggle && onToggle(newState);
  };

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      style={{
        ...styles.containerSwitch,
        backgroundColor: isDarkMode ? '#fff' : '#222',
      }}>
      <View
        style={[
          styles.circle,
          { transform: [{ translateX: isEnabled ? 20 : 0 }] },
        ]}>
        <ImageBackground
          source={isEnabled ? onImage : offImage}
          style={styles.imageBackground}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerSwitch: {
    borderRadius: 15,
    width: 100,
    height: 50,
    justifyContent: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: 30,
    height: 30,
  },
});

export default CustomSwitchWithIcon;
