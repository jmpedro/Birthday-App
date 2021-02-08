import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { validateEmail } from '../utils/validations';
import firebase from '../utils/firebase';

export default function RegisterForm(props) {

    const { changeForm } = props;
    const [formData, setFormData] = useState(validateValues());
    const [formError, setFormError] = useState({});

    const register = () => {
        
        let error = {};
        
        if( !formData.email || !formData.password || !formData.repeatPassword ) {

            if( !formData.email ) error.email = true;
            if( !formData.password ) error.password = true;
            if( !formData.repeatPassword ) error.repeatPassword = true;

        }else if( !validateEmail(formData.email) ) {

            error.email = true;

        }else if( formData.password !== formData.repeatPassword ) {

            error.password = true;
            error.repeatPassword = true;

        }else if( formData.password.length < 6 ) {

            error.password = true;
            error.repeatPassword = true;

        }else {

            // Creamos el usuario en firebase
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(() => {

                console.log('Cuenta creada');

            }).catch(() => {

                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true
                });

            });

        }

        setFormError(error);

    }

    return (
        <>
            <TextInput 
                placeholder="Correo electrónico"
                placeholderTextColor="#969696"
                style={[styles.input, formError.email && styles.errorLogin]}
                onChange={e => setFormData({...formData, email: e.nativeEvent.text})} />
            
            <TextInput 
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                style={[styles.input, formError.password && styles.errorLogin]}
                secureTextEntry={true}
                onChange={e => setFormData({...formData, password: e.nativeEvent.text})} />

            <TextInput 
                placeholder="Repite contraseña"
                placeholderTextColor="#969696"
                style={[styles.input, formError.repeatPassword && styles.errorLogin]}
                secureTextEntry={true}
                onChange={e => setFormData({...formData, repeatPassword: e.nativeEvent.text})} />

            <TouchableOpacity onPress={register}>

                <Text style={styles.btnText}>Registrar</Text>

            </TouchableOpacity>

            <View style={styles.login}>

                <TouchableOpacity onPress={changeForm}>

                    <Text style={styles.btnText}>Iniciar Sesión</Text>

                </TouchableOpacity>

            </View>
            
        </>
    )
}

function validateValues() {
    return {
        email: '',
        password: '',
        repeatPassword: ''
    }
};

const styles = StyleSheet.create({

    btnText: {
        color: '#fff',
        fontSize: 18,
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
    login: {
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 15
    },
    errorLogin: {
        borderColor: '#fd8c04',
        
    }

})
