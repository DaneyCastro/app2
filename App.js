import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import{NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

import UsersList from './Screens/UsersList'
import creatUser from './Screens/creatUser'
import UserDetails from './Screens/UserDetails'
import departamentos from './Screens/departamentos'
function MyStack(){
  return(
    <Stack.Navigator>
       
      <Stack.Screen name="UsersList" component={UsersList} options={{title: 'Lista de Usuarios'}}/>
      <Stack.Screen name="creatUser" component={creatUser} options={{title: 'Crear Nuevo Usuario'}}/>
      <Stack.Screen name="UserDetails" component={UserDetails} options={{title: 'Detalles de usuario'}}/>
      <Stack.Screen name="departamentos" component={departamentos} options={{title: 'Agregar Departamento'}}/>
      </Stack.Navigator>
    
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
