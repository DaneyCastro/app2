import React, {useEffect, useState} from 'react'
import{Button, StyleSheet} from 'react-native'
import {ListItem, Avatar} from 'react-native-elements'
import{ScrollView} from 'react-native-gesture-handler'
import firebase from "../database/firebase"


const ListadeUsuario =(props) => {

    const [usuarios, setUser] = useState ([])

    useEffect(() =>{
        firebase.db.collection('usuarios').onSnapshot(querySnapshot =>{
            const usuarios = [];
            
            querySnapshot.docs.forEach(doc =>{
                const {Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Correo, Movil, Departamento} = doc.data()
                usuarios.push({
                    id: doc.id,
                    Nombre,
                    ApellidoPaterno,
                    ApellidoMaterno,
                    FechaNacimiento,
                    Correo,
                    Movil,
                    Departamento
                })
            });
            
            setUser(usuarios)
        });
    }, []);
    return(
        <ScrollView>
            <Button title ="Agregar Nuevo" 
            onPress={()=> props.navigation.navigate("creatUser")}
            />

            {
                usuarios.map(usuarios =>{
                    return(
                        <ListItem
                        key={usuarios.id}
                        bottomDivider
                        onPress={() => {
                          props.navigation.navigate('UserDetails', {
                            usersId: usuarios.id,
                          });
                        }}
                      >
                        <ListItem.Chevron />
                        <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
                        <ListItem.Content>
                        <ListItem.Title>{usuarios.Nombre}</ListItem.Title>
                        <ListItem.Subtitle>{usuarios.ApellidoPaterno}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    );
                        
                })
            }
        </ScrollView>

    );
};

export default ListadeUsuario ;