import React, {useContext} from 'react';
import {Text} from 'react-native';
import axios from "axios";
import { Badge, Button, Center, HStack } from 'native-base';
import { ComidasContext } from '../contextState';

const API_KEY = "1fcffc9826e745be90f1f569128f1a5c";

async function AgregarPlato(id) {
  return await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, { 
    params: {
      apiKey: API_KEY
    }    
  })  
  .then(function (response) {
    return response.data;
  })
  .catch(() => {
    return null;
  });
}

export default function plato({data, isMenu, setModal}) {
  let platoOff = false;
  let colorScheme = "coolGray";

  const context = useContext(ComidasContext);

  platoOff = context.menu.some(plato => {
    return plato.title === data.title || context.menu.length == 4
  })
  if(platoOff) {
    colorScheme = "success"
  }

  return( 
      <Center>
      <HStack space={2}>
        <Text>{data.title}</Text>
        {data.vegan ?
            <Badge colorScheme="success">Vegano</Badge>
            : null
        }
      </HStack>
      {
        isMenu ?
        <>
        <HStack space={2} justifyContent="center">
          <Button colorScheme="danger" onPress={() => {
            context.setMenu(context.menu.filter(item => item.title != data.title));
          }}>
            <Text style={{color:'white'}}>Eliminar</Text>
          </Button>
          <Button colorScheme="info" onPress={() => {
            setModal(data);
          }}
          >
          <Text style={{color:'white'}}>Detalles</Text>
          </Button>
        </HStack>
        </>
        :
        <Button onPress={async () => {
          let newPlato = await AgregarPlato(data.id);
          let vegan = 0;
          let notVegan = 0;
          context.menu.forEach(element => {
            element.vegan ? vegan++ : notVegan++;
          });
          if (newPlato.vegan && vegan == 2 || !newPlato.vegan && notVegan == 2) {
            return null;
          }
          context.setMenu([...context.menu, newPlato]);
          }} disabled={platoOff} color={'danger'}>Añadir Plato</Button>
      }
      </Center>
  );
}

