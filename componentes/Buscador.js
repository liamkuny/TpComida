import React, { useContext} from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import { Input, Stack } from "native-base";
import { ComidasContext } from "../contextState.js";
import axios from "axios";
import Plato from './Plato.js';


export default function buscador() {
const API_KEY = "1fcffc9826e745be90f1f569128f1a5c";
const context = useContext(ComidasContext);

  function handleBusqueda(value) {
  if (value.length > 2) {
    return axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: API_KEY,
        query: value
      }
    })
      .then(function (response) {
          context.setPlatos(response.data.results);
      })
      .catch(() => {
        return null;
      });
  }
}


  

  const renderItem = ({ item }) => (
    <Plato data={item} isMenu={false} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Text style={{ fontSize: 24, color: "#000" }}>Buscador:</Text>
        <Input variant="filled" onChangeText={ handleBusqueda }
          placeholder={"Busque un plato"}
        />
      </Stack>
      <FlatList
        data={context.platos}
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

