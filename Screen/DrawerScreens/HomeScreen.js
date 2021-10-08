// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { NavigationState } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';


const HomeScreen = ({navigation}) => {
  const [userData, setUserData] = useState({nome:'', doacoes:0});

  function addDonation () {

    setUserData({nome : userData.nome, doacoes: userData.doacoes + 1})
  }

  function removeDonation () {
    if (userData.doacoes == 0) {

    } else {
      setUserData({nome : userData.nome, doacoes: userData.doacoes - 1})
    }

  }


  useEffect(()=>{
    async function getUser()
    {
      try {
        const userInfo = await AsyncStorage.getItem('username');
        const userDonations = await AsyncStorage.getItem('userdonations');
        setUserData({nome:userInfo, doacoes:Number(userDonations) })
        console.log(userData)
      } catch (error) {
        console.log(error)
      }

    }
    getUser();
},[]);

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
        <Card.Title title="Doações feitas" subtitle={userData.nome}/>
        <Card.Content>
        <Text style={styles.paragraph}>Número de Doações</Text>
        <View style={{display:'flex', flexDirection: 'row', alignItems:'center', marginTop:10}}>

        <Button style={styles.roundedButton}  mode="contained" onPress={() => removeDonation() }>
        <AntDesign name="minus" size={24} color="white" />
        </Button>
        <Text style={{marginLeft:30, marginRight: 30, fontSize: 30, fontWeight:'bold'}}>{userData.doacoes}</Text>
        <Button style={styles.roundedButton}  mode="contained" onPress={() => addDonation()}>
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