import React, { useEffect, useState, useContext } from 'react';
import {View} from 'react-native';
import Login from './screens/Login.js';
import Menu from './screens/menu.js';
import Buscador from './screens/buscador.js';
import { ContextProvider } from "./contextState";
import { Center, NativeBaseProvider } from 'native-base';
import { ImageBackground } from 'react-native-web';

export default function App() {
  const [auth, setAuth] = useState(false);
  const [menu, setMenu] = useState([]);

  return (
    <NativeBaseProvider>
      <ImageBackground  style={{width: '100%', height: '100%'}} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNelZTFlQlN25LqT_d1o3RYA2xjM3xr2lL6w&usqp=CAU"}} resizeMode="cover">
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
