import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Alert } from 'react-native'
import moment from 'moment';
import ActionBar from './ActionBar'
import AddBirthday from './AddBirthday';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import Birthday from './Birthday';

// Configuramos firebase y creamos una nueva coleccion

const db = firebase.firestore(firebase);

export default function ListBirthday(props) {

    const { user, logout } = props;
    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);
    const [pastBirthday, setPastBirthday] = useState([]);
    const [realodData, setReloadData] = useState(false);

    console.log(birthday);
    console.log(pastBirthday);

    // UseEffect para obtener los cumpleaños de un usuario
    useEffect(() => {
        
        setBirthday([]);
        setPastBirthday([]);

        db.collection(user.uid)
            .orderBy('dateBirthday', 'asc')
            .get().then( response => {

                let itemsArray = [];

                response.forEach( element => {

                    // obtenemos todos los datos
                    const data = element.data();

                    // obtenemos tambien su id y lo añadimos
                    data.id = element.id;

                    // guardamos en itemsArray este objeto
                    itemsArray.push(data);

                });

                formatData(itemsArray);

            });

        setReloadData(false);

    }, [realodData]);

    // Funcion para separar los cumpleaños qeu ya han pasado de los que están por venir
    const formatData = items => {

        // obtenemos la fecha actual
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });

        const birthdayTempArray = [];
        const pastBirthdayTempArray = [];

        // Recorremos items para sacar los datos de la fecha
        items.forEach((item) => {

            // obtenemos la fecha del cumpleaños
            const birthdayDate = moment(item.dateBirthday.seconds * 1000);
            // calculamos la diferencia de dias entre la fecha actual y la del cumpleaños
            const diffDate = currentDate.diff(birthdayDate, 'days');

            // Creamos una nueva propiedad(days)
            const itemTemp = item;
            itemTemp.days = diffDate;

            // Si la diferencia es negativa, significa que quedan ese numero de dias restantes hasta que llegue el cumpleaños.
            // Si la diferencia es positiva, significa que han pasado ese numero de dias desde que fue el cumpleaños.
            if ( diffDate <= 0 ) {

                birthdayTempArray.push(itemTemp);

            }else {

                pastBirthdayTempArray.push(itemTemp);

            }

        });

        setBirthday(birthdayTempArray);
        setPastBirthday(pastBirthdayTempArray);

    }

    // Funcion para eliminar un cumpleaños
    const deleteBirthday = birthday => {

        Alert.alert(
            'Eliminar cumpleaños',
            `¿Desea eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                       
                        db.collection(user.uid).doc(birthday.id).delete().then(() => setReloadData(true));

                    }
                }
            ],
            {cancelable: false}
        );

    }


    return (
        <View style={styles.container}>
            { showList ? (
                <>
                    <ScrollView style={styles.scrollview}>

                        {/* Cumpleaños por llegar */}
                        { birthday.map((item) => (

                            <Birthday key={item.id} birthday={item} deleteBirthday={deleteBirthday} />

                        )) }

                        {/* Cumpleaños pasados */}
                        { pastBirthday.map((item) => (

                            <Birthday key={item.id} birthday={item} deleteBirthday={deleteBirthday} />

                        )) }

                    </ScrollView>
                </>
            ) : 
            
                <AddBirthday user={user} setShowList={setShowList} setReloadData={setReloadData} />

            }
            
            <ActionBar showList={showList} setShowList={setShowList} logout={logout} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center'
    },
    scrollview: {
        marginBottom: 50,
        width: '100%'
    }
})
