// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';


const HomeScreen = ({props}) => {
  // props.navigation.navigate('LoginScreen')
  // alert(user)
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'flex-start'
          }}>
        <Card style={styles.card}>
        <Card.Title title="Doações feitas" subtitle='Nome da pessoa'/>
        <Card.Content>
        <Text style={styles.paragraph}>Número de Doações</Text>
        <View style={{display:'flex', flexDirection: 'row', alignItems:'center', marginTop:10}}>

        <Button style={styles.roundedButton}  mode="contained" onPress={() => console.log('Pressed')}>
        <AntDesign name="minus" size={24} color="white" />
        </Button>
        <Text style={{marginLeft:30, marginRight: 30, fontSize: 30, fontWeight:'bold'}}>0</Text>
        <Button style={styles.roundedButton}  mode="contained" onPress={() => console.log('Pressed')}>
        <AntDesign name="plus" size={24} color="white" />
        </Button>
        </View>
        </Card.Content>

        </Card>
        </View>

        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          © Vitalie - 2021
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '40%',
    backgroundColor: '#e7e9ed',
  },
  roundedButton: {
    width: 100,
    backgroundColor: '#FF5554'
  }

});