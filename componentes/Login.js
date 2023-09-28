import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import { Input, Stack } from 'native-base';

export default function login({ props }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(email, password) {
    try {
      await axios.post('http://challenge-react.alkemy.org/', {
        email: email,
        password: password,
      });
      return true;
    } catch (error) {
      setError('¡El Email o la Contraseña son incorrectos!');
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Text fontWeight="bold">¡Bienvenidos! Ingrese sus datos para Iniciar Sesion.</Text>
        <Input variant="filled" placeholder="Email" onChangeText={setEmail} />
        <Input variant="filled" placeholder="Contraseña" onChangeText={setPass} secureTextEntry={true} />
      </Stack>
      <Button
        title="Ingresar"
        onPress={async () => {
          if (!email || !pass) {
            setInvalid(true);
          } else {
            const res = await handleSubmit(email, pass);
            props.setAuth(res);
            if (!res) {
              setInvalid(true);
            }
          }
        }}
      />
      {invalid ? <Text style={{ color: 'red' }}>{error}</Text> : null}
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
  },
});
