import React, {useState, useEffect} from 'react'
import{View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import { State } from 'react-native-gesture-handler'
import firebase from '../database/firebase'
import {Picker} from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text'

const creatUser = (props) => {
    const [State, setState]= useState({
        id: '',
        Nombre: '',
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        FechaNacimiento: '',
        Correo: '',
        Movil: '',
        Departamento: '',

    });
    const [departamentos, setDepartamento] = useState ([]);
    const [selectedLanguage, setSelectedLanguage] = useState();
   


    const getDepartamentos = async ()=>{
        firebase.db.collection('departamentos').onSnapshot(querySnapshot =>{
            const departamentos = [];
            
            querySnapshot.docs.forEach(doc =>{
                const {nombre} = doc.data()
                departamentos.push({
                    id: doc.id,
                    nombre
                })
            });
           console.log(departamentos) ;
            setDepartamento(departamentos);
            
          //  getUserById(props.route.params.usersId);
        });
        
    };
    useEffect(()=>{
       // getUserById(props.route.params.usersId);
        getDepartamentos();
    }, []);

    const handleChangeText = (  Nombre, value)=> {
        setState({...State, [Nombre]: value});

        if(Nombre == 'Correo'){
            validateEmail(value)
        }
        else if(Nombre == 'FechaNacimiento'){
            validateFecha(value)
        }
        else if(Nombre == 'Movil'){
            validateNumero(value)
        }
    };

    const AddNewUser = async () => {
        
        if(State.Movil.length == 0 || State.FechaNacimiento.length == 0 || State.Correo.length == 0){
            alert('Valores incorrectos')
        } else{
            try {
                await firebase.db.collection('usuarios').add({
                    Nombre: State.Nombre,
                    ApellidoPaterno: State.ApellidoPaterno,
                    ApellidoMaterno: State.ApellidoMaterno,
                    FechaNacimiento: State.FechaNacimiento,
                    Correo:State.Correo,
                    Movil: State.Movil,
                    Departamento: State.Departamento,
                });
                props.navigation.navigate('UsersList');
                
            } catch (error) {
               console.log(error);
            }
        }
 
    };

    const cambioCombo = async (itemValue)=>{
        setSelectedLanguage(itemValue);
        State.Departamento = itemValue;
    };

    const validateEmail = async (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
         // this.setState({ email: text })
         State.Correo = '';
          return false;
        }
        else {
          //this.setState({ email: text })
          console.log("Email is Correct");
          
          State.Correo = text;
        }
      }

      const validateFecha = async (text) => {
        console.log(text);
        let reg = /^(?:0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])\1\d{4}$/;
        if (reg.test(text) === false) {
          console.log("Fecha is Not Correct");
         // this.setState({ email: text })
         State.FechaNacimiento = '';
          return false;
        }
        else {
          //this.Fecha({ email: text })
          console.log("Fecha is Correct");
          State.FechaNacimiento = text;
        }
      }

      const validateNumero = async (text) => {
        console.log(text);
        let reg = /^((\d{10})|(\d{13}))$/;
        if (reg.test(text) === false) {
          console.log("Numero is Not Correct");
         // this.setState({ email: text })
         State.Movil = '';
          return false;
        }
        else {
          //this.Fecha({ email: text })
          console.log("Numero is Correct");
          
          State.Movil = text;
        }
      }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.impoutGroup}>
            <TextInput placeholder= "Nombre" 
                       onChangeText={(value)=> handleChangeText('Nombre', value)}
                       />
            </View>
            <View style={styles.impoutGroup}>
            <TextInput placeholder= "Apellido Paterno"
             onChangeText={(value)=> handleChangeText('ApellidoPaterno', value)}
            />
            </View>
            <View style={styles.impoutGroup}>
            <TextInput placeholder= "Apellido Materno"
             onChangeText={(value)=> handleChangeText('ApellidoMaterno', value)}
            />
            </View>
            <View style={styles.impoutGroup}>
            <TextInput placeholder= "Fecha de Nacimiento" 
             onChangeText={(value)=> handleChangeText('FechaNacimiento', value)}
             
            />
            </View>
            <View style={styles.impoutGroup}>
            <TextInput placeholder= "Correo Electronico" 
             onChangeText={(value)=> handleChangeText('Correo', value)}
             
            />
            </View>
            <View style={styles.impoutGroup}>
            <TextInput placeholder= "Telefono Movil" 
             onChangeText={(value)=> validateNumero(value)}
             
             />
            </View>

            
            <View styles={styles.impoutGroup}>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        cambioCombo(itemValue)
                     
                    }
                >
                {
                    departamentos.map(departamentos =>{
                        return(
                                <Picker.Item label={departamentos.nombre} value={departamentos.id} />
                        ); 
                    })
                }
                </Picker>
           </View>

           

            <View style={styles.btn}>
            <Button
            color="#236FDE" title="Guardar" onPress= {()=> AddNewUser() }></Button>
            </View>
            
            <ScrollView>
            <Button 
            color="#9CA2AB"
            title ="Agregar Departamento" 
            onPress={()=> props.navigation.navigate("departamentos")}
            />
            

        </ScrollView>
        </ScrollView>
            
        
            
                 

    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    impoutGroup:{
        flex: 1,
        padding: 1,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    btn: {
        marginBottom: 7,
      },
})

export default creatUser