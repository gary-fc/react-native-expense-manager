import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import {
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from '../hooks/useForm';
import { CustomSwitch } from '../components/shared/CustomSwitch';
import CustomTextInput from '../components/shared/CustomTextInput';
import { StackScreenProps } from '@react-navigation/stack';
import AuthContext from '../context/auth/AuthContext';

interface Props extends StackScreenProps<any, any> {
}

const RegisterScreen = ({ navigation }: Props) => {
  const { theme, setDarkTheme, setLightTheme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { height } = useWindowDimensions();
  const { firstName, lastName, email, password, repeatPassword, onChange } =
    useForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    });

  const { signUp } = useContext(AuthContext);

  const onRegister = () => {
    Keyboard.dismiss();
    signUp({ firstName, lastName, email, password });
  };

  const onNavigateLogin = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.primary }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ ...styles.imageContainer, height: height * 0.4 - insets.top, marginTop: insets.top }}>
          <Image
            source={require('../assets/images/register.png')}
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
              Register
            </Text>

            <View style={{ marginTop: 40, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>
                First Name
              </Text>
              <CustomTextInput
                placeholder="pedro@expensemanager.com"
                onChangeText={text => onChange(text, 'email')}
                onSubmitEditing={onRegister}
              />
            </View>

            <View style={{ marginTop: 20, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>
                Last Name
              </Text>
              <CustomTextInput
                placeholder="pedro@expensemanager.com"
                onChangeText={text => onChange(text, 'email')}
                onSubmitEditing={onRegister}
              />
            </View>

            <View style={{ marginTop: 20, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>
                Email
              </Text>
              <CustomTextInput
                placeholder="pedro@expensemanager.com"
                onChangeText={text => onChange(text, 'email')}
                onSubmitEditing={onRegister}
              />
            </View>

            <View style={{ marginTop: 20, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>
                Password
              </Text>
              <CustomTextInput
                placeholder="********"
                icon={isPasswordVisible ? 'eye-blocked' : 'eye'}
                isPassword={!isPasswordVisible}
                onChangeText={text => onChange(text, 'password')}
                onSubmitEditing={onRegister}
                onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </View>

            <View style={{ marginTop: 20, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>
                Repeat Password
              </Text>
              <CustomTextInput
                placeholder="********"
                icon={isPasswordVisible ? 'eye-blocked' : 'eye'}
                isPassword={!isPasswordVisible}
                onChangeText={text => onChange(text, 'password')}
                onSubmitEditing={onRegister}
                onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </View>

            <TouchableOpacity
              onPress={onRegister}
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
                Register
              </Text>
            </TouchableOpacity>

            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: theme.colors.text }}>
                Already have an account?{' '}
              </Text>
              <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                Login
              </Text>
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
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 130,
  },
  formContainer: {
    flex: 8,
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
export default RegisterScreen;
