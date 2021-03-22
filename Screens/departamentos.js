import React, {useState, useEffect} from 'react'
import firebase from '../database/firebase'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'

const createDepartamento = (props) =>{
    const [State, setState]= useState({
        id: '',
        nombre: '',

    });
 ;

const handleChangeText = (  nombre, value)=> {
    setState({...State, [nombre]: value});
};

const AddNewDepartamento = async () => {
    if(State.nombre === ''){
        alert('El nombre no puede estar vacio')
    } else{
        try {
            await firebase.db.collection('departamentos').add({

                nombre: State.nombre,
               
            });
            props.navigation.navigate('creatUser');
            
        } catch (error) {
           console.log(error);
        }
       
       
    };

    };
        return(
              <ScrollView style={styles.container}>
              <View style={styles.impoutGroup}>
              <TextInput placeholder= "nombre" 
                   onChangeText={(value)=> handleChangeText('nombre', value)}
                   />
                    </View>

                    <View style={styles.btn}>
            <Button
            color="#236FDE" title="Guardar" onPress= {()=> AddNewDepartamento() }></Button>
            </View>
            
            <ScrollView>
            <Button 
            color="#9CA2AB"
            title ="Cancelar" 
            onPress={()=> props.navigation.navigate("UsersList")}
            />
                   
              </ScrollView>
              </ScrollView>
                

            );
};


        const styles = StyleSheet.create({
            container:{
           flex:1,
          padding:35
        },
            impoutGroup:{
           flex: 1,
           padding: 0,
            marginBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc'
        },
            btn: {
           marginBottom: 7,
         },
});
    

export default createDepartamento