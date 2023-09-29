
import React, { useState} from 'react';
import { SafeAreaView, FlatList, Text, Modal, StyleSheet, View, Pressable, Image } from 'react-native';

import Plato from './Plato.js';
import { useContext } from 'react';
import { ComidasContext } from '../contextState.js';

export default function menu() {
  const [modalData, setModal] = useState(false);
  
  const context = useContext(ComidasContext);

  let acumulativoPrecio = 0;
  let acumulativoSalud = 0;
  context.menu.forEach(element => {
    acumulativoPrecio += element.pricePerServing;
    acumulativoSalud += element.healthScore;
  });

  const renderItem = ({ item }) => (
    <Plato data={item} isMenu={true} modal={modalData} setModal={setModal} />
  );
  let vegan = 0;
  let notVegan = 0;
  context.menu.forEach(element => {
    element.vegan ? vegan++ : notVegan++;
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, color: "#000" }} >Menu:</Text>
      <Text>Acumulativo precio: {acumulativoPrecio}</Text>
      <Text>Salud promedio: {context.menu.length ? acumulativoSalud / context.menu.length : '0'}</Text> 
      <Text>Platos veganos: {vegan} {vegan == 2 ? '[Maximo de platos]' : ''}</Text>
      <Text>Platos no veganos: {notVegan} {notVegan == 2 ? '[Maximo de platos]' : ''}</Text>
      <FlatList
        data={context.menu}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalData}
        onRequestClose={() => {
          setModal(!modalData);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Detalles del Plato: </Text>
            <Text style={styles.modalText}>Nombre: {modalData.title} </Text>
            <Text style={styles.modalText}>Precio: {modalData.pricePerServing} </Text>
            <Text style={styles.modalText}>Es Vegano?: {modalData.vegan ? 'si' : 'no'} </Text>
            <Image
              style={{ width: '100%', height: '40%' }}
              source={{ uri: modalData.image }}
            />
            <Pressable
              style={[styles.button, styles.buttonCerrar]}
              onPress={() => setModal(!modalData)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonCerrar: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    textAlign: "center"
  },
  modalText: {
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  }
});
