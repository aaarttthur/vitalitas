// Import React and Component
import React, { useState, createRef } from 'react';
import userData from '../src/resources/users.json'
import md5 from 'md5';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { AsyncStorage } from 'react-native';

import Loader from './Components/Loader';

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  async function handleSubmitPress () {
    try {
      setErrortext('');
      if (!userEmail) {
        alert('Por favor coloque seu email.');
        return;
      }
      if (!userPassword) {
        alert('Por favor coloque sua senha.');
        return;
      }
      setLoading(true);
      let encodedPassword = md5(userPassword);
      for (var user in userData) {
        if (userData[user]['email'] == userEmail && userData[user]['senha'] == encodedPassword ) {
          let loggedUser = userData[user];
          await AsyncStorage.setItem('username', loggedUser['nome']);
          await AsyncStorage.setItem('userdonations', loggedUser['doacoes'].toString());
          setUserEmail('');
          setUserPassword('');
          setLoading(false);
          navigation.navigate('DrawerNavigationRoutes', {user: loggedUser});
        } else {
          if (userData.length == Number(user) + 1) {
            setLoading(false);
            setErrortext('Por favor cheque seu e-mail e sua senha');
          }

        }
      }
    } catch (error) {
      alert(error);
    }

  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../Image/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                value = {userEmail}
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Insira o email" //dummy@abc.com
                placeholderTextColor="#D4F1F4"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                value = {userPassword}
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Insira a senha" //12345
                placeholderTextColor="#D4F1F4"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              Novo aqui? Registre-se!
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RecoverPWScreen')}>
              Esqueci minha senha
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RecoverPWScreen')}>
              Entrar sem login 
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FF5554',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#0000DC',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#0000DC',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});
