import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/es';
import firebase from '../utils/firebase';
import 'firebase/firestore';

// Configuramos firebase y creamos una nueva coleccion
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function AddBirthday(props) {

    const { user, setShowList, setReloadData } = props;
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});

    // OCULTAR CALENDARIO
    const hideDatePicker = () => {
        
        setIsDatePickerVisible(false);

    }

    // CONFIRMAR LA FECHA DE CUMPLEAÑOS
    const handlerConfirm = date => {
        
        // seteamos el estado con date
        setFormData({...formData, dateBirthday: date});
        
        hideDatePicker();
        
    }

    // MOSTRAR EL CALENDARIO 
    const showDatePicker = () => {

        setIsDatePickerVisible(true);
        
    }

    // FUNCION ON CHANGE
    const onChange = (e, type) => {

        setFormData({...formData, [type]: e.nativeEvent.text});

    }


    // ENVIAR DATOS DEL FORMULARIO
    const onSubmit = () => {

        let errors = {};

        if( !formData.dateBirthday || !formData.name || !formData.lastname ) {

            if( !formData.dateBirthday  ) errors.dateBirthday = true;
            if( !formData.name  ) errors.name = true;
            if( !formData.lastname  ) errors.lastname = true;

        }else {

            const data = formData;
            
            
            // Creamos la coleccion de cumples
            db.collection(user.uid).add(data).then(() => {
                
                // Una vez guardado el cumpleaños, volvemos a la lista de cumpleaños
                setReloadData(true);
                setShowList(true);

            }).catch(() => {

                setFormError({ name: true, lastname: true, dateBirthday: true });

            });

        }

        setFormError(errors);

    }

    return (
        <>

            <View style={styles.container}>

                <TextInput 
                    placeholder="Nombre" 
                    placeholderTextColor="#969696" 
                    style={[styles.input, formError.name && {borderColor: '#fd8c04'} ]}
                    onChange={e => onChange(e, "name")} />
                <TextInput 
                    placeholder="Apellidos" 
                    placeholderTextColor="#969696" 
                    style={[styles.input, formError.lastname && {borderColor: '#fd8c04'} ]}
                    onChange={e => onChange(e, "lastname")} />
                
                <View style={[styles.input, styles.datepicker, formError.dateBirthday && {borderColor: '#fd8c04'}]}>
                    <Text style={{color: formData.dateBirthday ? "#fff" : "#969696", fontSize: 18}} onPress={showDatePicker}>

                        { formData.dateBirthday ? moment(formData.dateBirthday).format('LL') : "Fecha de nacimiento" }
                        
                    </Text>

                </View>

                <TouchableOpacity onPress={onSubmit}>

                    <Text style={styles.btnAdd}>Crear nuevo cumpleaños</Text>

                </TouchableOpacity>

            </View>

            <DateTimePickerModal 
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker} 
            />

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '85%',
        height: 50,
        borderRadius: 50,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#1e3040',
        color: '#fff',
        fontSize: 18,
        marginBottom: 25
    },
    datepicker: {
        justifyContent: 'center'
    },
    btnAdd: {
        fontSize: 18,
        color: '#fff'
    }
})
