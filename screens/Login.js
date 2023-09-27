import React, { useState, useContext } from 'react';
import { setStatusBarHidden, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from "axios";
import { Input, Stack } from "native-base";

async function handleSubmit(email, password) {
  return axios.post('http://challenge-react.alkemy.org/', {  
    email: email,
    password: password
  })
    .then(() => { 
      console.log ("test")
      return true;
    })
    .catch(() => {
      return false;
    });
}

export default function login({props}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [inv, setInv] = useState(false);

  return (
    <View style={styles.container}>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
      <Text fontWeight="bold">¡Bienvenidos! Ingrese sus datos para Iniciar Sesion.</Text>
      <Input variant="filled" placeholder="Email" onChangeText={setEmail}/>
      <Input variant="filled" placeholder="Contraseña" onChangeText={setPass} secureTextEntry={true}/>
      <StatusBar style="auto" />
      </Stack>
      <Button
        title="Ingresar"
        onPress={async () => {
          if (!email || !pass) {
            setInv(true);
          } else {
            const res = await handleSubmit(email, pass);
            props.setAuth(res);
            console.log(props.auth);
          }
        }}
      />
      {inv ? <Text color="red">¡El Email o la Contraseña son incorrectos!</Text> : null}
    </View>
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
