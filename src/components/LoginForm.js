import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { validateEmail } from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {

    const { changeForm } = props;
    const  [formData, setFormData] = useState(defaultValues());
    const [formError, setFormError] = useState({});

    const login = () => {
        
        let errors = {};

        if( !formData.email || !formData.password ) {

            if( !formData.email ) errors.email = true;
            if( !formData.password ) errors.password = true;

        }else if( !validateEmail(formData.email) ) {

            errors.email = true;

        }else {

            // Iniciamos sesion
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .catch(() => {

                setFormError({
                    email: true,
                    password: true
                });
                
            } );

        }

        setFormError(errors);

    }

    const onChange = (e, type) => {

        // Obtenemos los datos anteriores al onChange y añadimos los nuevos para que despues no se borren
        setFormData({...formData, [type]: e.nativeEvent.text});

    }

    return (
        <>

            <TextInput 
                placeholder="Correo electrónico"
                placeholderTextColor="#969696"
                style={[styles.input, formError.email && styles.errorLogin]}
                onChange={e => onChange(e, 'email')} 
            />
            
            <TextInput 
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                style={[styles.input, formError.password && styles.errorLogin]}
                secureTextEntry={true}
                onChange={e => onChange(e, 'password')}             
            />

            <TouchableOpacity onPress={login}>

                <Text style={styles.btnText}>Iniciar Sesión</Text>

            </TouchableOpacity>

            <View style={styles.register}>

                <TouchableOpacity onPress={changeForm}>

                    <Text style={styles.btnText}>Registrarse</Text>

                </TouchableOpacity>

            </View>

            

        </>
    )
}

// Inicializamos el state
function defaultValues() {
    return {
        email: '',
        password: ''
    };
}

const styles = StyleSheet.create({

    btnText: {
        color: '#fff',
        fontSize: 18
    },
    input: {
        height: 50,
        color: '#fff',
        paddingHorizontal: 20,
        marginBottom: 20,
        width: '80%',
        backgroundColor: '#1e3040',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#1e3040',
        fontSize: 18
    },
    register: {
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 15
    },
    errorLogin: {
        borderColor: '#fd8c04',
    }

})
