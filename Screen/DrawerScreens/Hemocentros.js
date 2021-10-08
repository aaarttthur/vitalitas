import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import { Card, Button } from 'react-native-paper';
import hemoData from '../../src/resources/hemocentros.json';


const Hemocentros = () => {

const dataRows = hemoData.map((hemocentro, index) => {

  return (
    <Card key={index} style={{marginTop: 10}}>
      <Card.Content>
      <Text style={{fontWeight:'bold', fontSize:16}}>Nome</Text>
      <Text>{hemocentro['nome']}</Text>
      <Text style={{fontWeight:'bold', fontSize:16, marginTop: 8}}>Endereço</Text>
      <Text>{hemocentro['endereco']}</Text>
      <Text style={{fontWeight:'bold', fontSize:16, marginTop: 8}}>Telefone</Text>
      <Text>{hemocentro['telefone']}</Text>
      </Card.Content>
    </Card>
  )


})


  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, padding: 16}}>

      {dataRows}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Hemocentros;