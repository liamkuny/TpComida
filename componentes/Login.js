import React, { useContext, useState } from 'react';
import { Text, View, Button} from 'react-native';
import axios from 'axios';
import { Input, Stack } from 'native-base';
import { ComidasContext } from "../contextState.js";

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  
  const context = useContext(ComidasContext);
  
  async function handleSubmit(email, password) {
    if (!email || !password) {
      alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('http://challenge-react.alkemy.org/', {
        email: email,
        password: password,
      });

      setLoading(false);

      if (response.data && response.data.token) {
       
        context.setAuth(response.data.token);
      } else {
        context.setAuth("");
        alert('Error', 'Credenciales inválidas');
      }
    } catch (error) {
      setLoading(false);
      
      alert('Error', 'Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  }

  return (
    <View style={styles.container}>
      <Stack space={4} w="75%" maxW="300px" mx="auto">
        <Text fontWeight="bold">¡Bienvenidos! Ingrese sus datos para Iniciar Sesion.</Text>
        <Input variant="filled" placeholder="Email" name="mail" onChangeText={setEmail} />
        <Input variant="filled" placeholder="Contraseña" name="contraseña" onChangeText={setPass} secureTextEntry={true} />
      </Stack>
      <Button
        title="Ingresar"
        onPress={async () => {
          handleSubmit(email, pass);
        }}
        disabled={loading} 
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    marginVertical: 300,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
};