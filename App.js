import React, { useEffect, useState, useContext } from 'react';
import {View} from 'react-native';
import Login from './componentes/Login.js';
import Menu from './componentes/menu.js';
import Buscador from './componentes/buscador.js';
import { ContextProvider } from "./contextState";
import { Center, NativeBaseProvider } from 'native-base';
import { ImageBackground } from 'react-native-web';

export default function App() {
  const [auth, setAuth] = useState(false);
  const [menu, setMenu] = useState([]);

  return (
    <NativeBaseProvider>
      <ImageBackground  style={{width: '100%', height: '100%'}} source={{uri: "https://img.freepik.com/vector-gratis/fondo-comida-rapida-dibujado-mano_23-2149013389.jpg?w=2000"}} resizeMode="cover">
        <Center>
        <ContextProvider>
          {auth ?
            <View style={{flexDirection:"row"}}>
              <Buscador props={{menu, setMenu}}/>
              <Menu props={{menu, setMenu}}/>
            </View>
          :
            <Login props={{auth, setAuth}}/>
          }
           </ContextProvider>
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
}
