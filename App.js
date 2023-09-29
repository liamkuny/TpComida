import React, { useState } from 'react';
import {View} from 'react-native';
import Login from './componentes/Login.js';
import Menu from './componentes/Menu.js';
import Buscador from './componentes/Buscador.js';
import { ComidasContext } from "./contextState";
import { Center, NativeBaseProvider } from 'native-base';
import { ImageBackground } from 'react-native-web';

export default function App() {
  const [auth, setAuth] = useState("");
  const [menu, setMenu] = useState([]);
  const [platos, setPlatos] = useState([]);

  return (
    <NativeBaseProvider>
      <ImageBackground  style={{width: '100%', height: '100%'}} source={{uri: "https://img.freepik.com/vector-gratis/fondo-comida-rapida-dibujado-mano_23-2149013389.jpg?w=2000"}} resizeMode="cover">
        <Center>
        <ComidasContext.Provider value={{auth, setAuth, menu, setMenu, platos, setPlatos}}>
          {auth.length !== 0 ?
            <View style={{flexDirection:"row"}}>
              <Buscador/>
              <Menu />
            </View>
          :
            <Login />
          }
           </ComidasContext.Provider>
        </Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
}
