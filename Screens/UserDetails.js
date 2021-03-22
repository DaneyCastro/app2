import React, {useEffect, useState} from 'react'
import{ StyleSheet, Button, View, Alert, TextInput, ActivityIndicator, ScrollView, Picker} from 'react-native'
import { State } from 'react-native-gesture-handler';
import firebase from '../database/firebase'



const UserDetails =(props) => {

  const [usuarios, setUser]  = useState ( {
        id:'',
        Nombre: '',
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        FechaNacimiento: '',
        Correo:'',
        Movil:'',
        Departamento:'',
    });
    const [loading, setLoading] = useState(true);

    const [departamentos, setDepartamento] = useState ([]);
    const [selectedLanguage, setSelectedLanguage] = useState();

    const getUserById = async (usersId)=>{
        //console.log(usersId);
        const dbRef = firebase.db.collection("usuarios").doc(usersId);
        const doc = await dbRef.get();
        console.log(doc)
        const usuarios = doc.data();
       setUser({
            ...usuarios,
           id: doc.id,
        });
        setLoading(false)
        console.log('usuario');
        
        setSelectedLanguage(usuarios.Departamento);
        usuarios.Departamento = usuarios.Departamento;
    };
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
            
            getUserById(props.route.params.usersId);
        });
        
    };
    useEffect( ()=>{
        getDepartamentos();
       // console.log(usuarios.Departamento);
    }, []);

    const handleChangeText = (  Nombre, value)=> {
        setUser({...usuarios, [Nombre]: value});

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

    const deleteUser = async () =>{
        
        const dbRef = firebase.db
        .collection('usuarios')
        .doc(props.route.params.usersId);
        await dbRef.delete();
       
        props.navigation.navigate('UsersList');
    };

    const updateUser = async () => {
        if(usuarios.Movil.length == 0 || usuarios.FechaNacimiento.length == 0 || usuarios.Correo.length == 0){
            alert('Valores incorrectos')
        } else{
            try {
                const dbRef = firebase.db.collection('usuarios').doc(usuarios.id);
                await dbRef.set({
                    Nombre: usuarios.Nombre,
                    ApellidoPaterno: usuarios.ApellidoPaterno,
                    ApellidoMaterno: usuarios.ApellidoMaterno,
                    FechaNacimiento: usuarios.FechaNacimiento,
                    Correo: usuarios.Correo,
                    Movil: usuarios.Movil,
                    Departamento: usuarios.Departamento,
                });
                //setUser(dbRef);
                props.navigation.navigate('UsersList');
                
            } catch (error) {
                console.log(error);
            }
       
    };
    };

    const openConfirmationAlert = () => {
        Alert.alert(
          'Eliminar Usuario',
          '¿Esta seguro que desea eliminar?',
          [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log('false') },
          ],
          
        );
        
      };

    if (loading){
       return(
            <View>
                <ActivityIndicator size= "large" color="#9E9E9E"/>
            </View>
       );
   };

   const cambioCombo = async (itemValue)=>{
    setSelectedLanguage(itemValue);
    usuarios.Departamento = itemValue;
    };

    const validateEmail = async (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
         // this.setState({ email: text })
         usuarios.Correo = '';
          return false;
        }
        else {
          //this.setState({ email: text })
          console.log("Email is Correct");
          
          usuarios.Correo = text;
        }
      }

      const validateFecha = async (text) => {
        console.log(text);
        let reg = /^(?:0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])\1\d{4}$/;
        if (reg.test(text) === false) {
          console.log("Fecha is Not Correct");
         // this.setState({ email: text })
         usuarios.FechaNacimiento = '';
          return false;
        }
        else {
          //this.Fecha({ email: text })
          console.log("Fecha is Correct");
          usuarios.FechaNacimiento = text;
        }
      }

      const validateNumero = async (text) => {
        console.log(text);
        let reg = /^((\d{10})|(\d{13}))$/;
        if (reg.test(text) === false) {
          console.log("Numero is Not Correct");
         // this.setState({ email: text })
         usuarios.Movil = '';
          return false;
        }
        else {
          //this.Fecha({ email: text })
          console.log("Numero is Correct");
          
          usuarios.Movil = text;
        }
      }; 

    return(
        <ScrollView style={styles.container}>
            <View style= {styles.impoutGroup}>
            <TextInput placeholder= "Nombre"
             onChangeText={(value)=> handleChangeText( 'Nombre', value)}
             value={usuarios.Nombre}
                   />
        </View>
        
        <View style= {styles.impoutGroup}>
            <TextInput placeholder= "Apellido Paterno"
            value={usuarios.ApellidoPaterno}
             onChangeText={(value)=> handleChangeText('ApellidoPaterno', value)}
             
             />
             </View>
             <View style= {styles.impoutGroup}>
            <TextInput placeholder= "Apellido Materno"
            value={usuarios.ApellidoMaterno}
             onChangeText={(value)=> handleChangeText('ApellidoMaterno', value)}
             
             />
             </View>
             <View style= {styles.impoutGroup}>
            <TextInput placeholder= "Fecha de Nacimiento"
            value={usuarios.FechaNacimiento}
             onChangeText={(value)=> handleChangeText('FechaNacimiento', value)}
             
             />
             </View>
             <View style= {styles.impoutGroup}>
            <TextInput placeholder= "Correo Electronico"
            value={usuarios.Correo}
             onChangeText={(value)=> handleChangeText('Correo', value)}
             
             />
             </View>
             <View style= {styles.impoutGroup}>
            <TextInput placeholder= "Telefono Movil"
            value={usuarios.Movil}
             onChangeText={(value)=> handleChangeText('Movil', value)}
             
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
           
             
             
        <View style ={styles.btn}>
        <Button
        color="#19AC52"
         title="Actualizar Usuario" onPress= {()=> updateUser() }></Button>
        </View>
        <View>
        <Button
        color="#E37399" title="Eliminar Usuario" onPress= {()=> openConfirmationAlert() }></Button>
        </View>

    </ScrollView>


    );

    };
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      },
    impoutGroup:{
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    picker:{
        flex: 1,
        padding: 0,
        margin: 150,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    btn: {
        marginBottom: 7,
      },
});

export default UserDetails