import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import { Input, Stack } from "native-base";
import axios from "axios";
import Plato from './Plato.js';

const API_KEY = "221d9747c4fb456ea27b3066c173ae43";


async function onChangeText(value) {
  if (value.length > 2) {
    return await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: API_KEY,
        query: value
      }
    })
      .then(function (response) {
        return response.data.results;
      })
      .catch(() => {
        return null;
      });
  }
}

export default function buscador({ props }) {
  const [found, setFound] = useState([]);

  const renderItem = ({ item }) => (
    <Plato data={item} isMenu={false} setMenu={props.setMenu} menu={props.menu} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Text style={{ fontSize: 24, color: "#000" }}>Buscador:</Text>
        <Input variant="filled" onChangeText={async (value) => {
          setFound(await onChangeText(value))
        }}
          placeholder={"Busque un plato"}
        />
      </Stack>
      <FlatList
        data={found}
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

