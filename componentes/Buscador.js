import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import { Input, Stack } from "native-base";
import { ActionTypes, useContextState } from "../contextState.js";
import axios from "axios";
import Plato from './Plato.js';


export default function buscador({ props }) {
const API_KEY = "1fcffc9826e745be90f1f569128f1a5c";
const { contextState, setContextState } = useContextState();

 function onChangeText(value) {
  if (value.length > 2) {
    return await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: API_KEY,
        query: value
      }
    })
      .then(function (response) {
          setContextState({ newValue: false, type: ActionTypes.setLoading });
          setContextState({ newValue: response, type: ActionTypes.setComidas });

      })
      .catch(() => {
        return null;
      });
  }
}


  

  const renderItem = ({ item }) => (
    <Plato data={item} isMenu={false} setMenu={props.setMenu} menu={props.menu} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Text style={{ fontSize: 24, color: "#000" }}>Buscador:</Text>
        <Input variant="filled" onChangeText={ (value) => {
        }}
          placeholder={"Busque un plato"}
        />
      </Stack>
      <FlatList
        data={contextState?.allComidas??[]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 300,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  }
});

