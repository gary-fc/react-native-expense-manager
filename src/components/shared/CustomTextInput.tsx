import { StyleSheet, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/selection.json';
import { ThemeContext } from '../../context/theme/ThemeContext';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

interface CustomTextInputProps {
  placeholder: string;
  icon?: string;
  capitalize?: 'none' | 'sentences' | 'words' | 'characters';
  isPassword?: boolean;
  autoCorrect?: boolean;
  onIconPress?: () => void;
  onSubmitEditing?: () => void;
  onChangeText: (text: string) => void;
}

const CustomTextInput = (customTextInputProps: CustomTextInputProps) => {
  const { theme } = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        ...styles.container,
        borderColor: isFocused ? theme.colors.primary : theme.colors.border,
        borderWidth: isFocused ? 2 : 1,
      }}>
      <TextInput
        style={{ ...styles.textInput, color: theme.colors.text }}
        autoCorrect={customTextInputProps.autoCorrect}
        autoCapitalize={customTextInputProps.capitalize}
        placeholder={customTextInputProps.placeholder}
        placeholderTextColor={theme.colors.text}
        onChangeText={text => customTextInputProps.onChangeText(text)}
        onSubmitEditing={() => customTextInputProps.onSubmitEditing ? customTextInputProps.onSubmitEditing() : null}
        secureTextEntry={customTextInputProps.isPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {customTextInputProps.icon ? (
        <Icon
          style={{ ...styles.icon }}
          name={customTextInputProps.icon}
          size={20}
          color={isFocused ? theme.colors.primary : theme.colors.icons}
          onPress={customTextInputProps.onIconPress}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    height: 40,
  },
  textInput: {
    flex: 1,
    paddingLeft: 8,
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    paddingRight: 8,
  },
});

export default CustomTextInput;
