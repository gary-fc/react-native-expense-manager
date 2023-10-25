import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';

import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { ThemeContext } from '../context/theme/ThemeContext';
import { CustomSwitch } from '../components/shared/CustomSwitch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTextInput from '../components/shared/CustomTextInput';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import AuthContext from '../context/auth/AuthContext';

interface Props extends StackScreenProps<any, any> {
}

const LoginScreen = ({ navigation }: Props) => {
  const { theme, setDarkTheme, setLightTheme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { height } = useWindowDimensions();
  const { email, password, onChange } = useForm({ email: '', password: '' });
  const { signIn, removeError, errorMessage } = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Login Error', errorMessage, [
      {
        text: 'OK',
        onPress: removeError,
      },
    ]);
    console.log({ errorMessage });
  }, [errorMessage]);

  const onLogin = () => {
    console.log({ email, password });
    Keyboard.dismiss();
    signIn({ email, password });
  };
  const onNavigateRegister = () => {
    navigation.replace('RegisterScreen');
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.primary }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ ...styles.imageContainer, height: height * 0.4 - insets.top, marginTop: insets.top }}>
          <Image
            source={require('../assets/images/login.png')}
            style={styles.image}
          />

          <View style={styles.toggleThemeContainer}>
            <CustomSwitch
              isOn={theme.dark}
              onChange={value => (value ? setDarkTheme() : setLightTheme())}
            />
          </View>
        </View>

        <View
          style={{
            ...styles.formContainer,
            backgroundColor: theme.colors.background,
            height: height * 0.6,
          }}>
          <View style={styles.form}>
            <Text style={{ ...styles.lblLogin, color: theme.colors.text }}>
              Log In
            </Text>

            <View style={{ marginTop: 40, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>
                Email
              </Text>
              <CustomTextInput
                capitalize={'none'}
                placeholder="pedro@expensemanager.com"
                onChangeText={text => onChange(text, 'email')}
                onSubmitEditing={onLogin}
              />
            </View>

            <View style={{ height: 65, marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>
                Password
              </Text>
              <CustomTextInput
                placeholder="********"
                icon={isPasswordVisible ? 'eye-blocked' : 'eye'}
                isPassword={!isPasswordVisible}
                onChangeText={text => onChange(text, 'password')}
                onSubmitEditing={onLogin}
                onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </View>

            <TouchableOpacity
              onPress={onLogin}
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 8,
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}
              activeOpacity={0.8}>
              <Text
                style={{
                  color: theme.colors.text,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Login
              </Text>
            </TouchableOpacity>

            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: theme.colors.text }}>Dont have an account? </Text>
              <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}
                    onPress={onNavigateRegister}>Register</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  toggleThemeContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 99,
  },
  imageContainer: {
    flex: 4,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  formContainer: {
    flex: 6,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  form: {
    width: '90%',
    height: '90%',
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  lblLogin: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
