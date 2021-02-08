import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Birthday(props) {

    const { birthday, deleteBirthday } = props;

    // Funcion para mostrar los dias
    const infoDays = () => {

        const restDays = -birthday.days;

        if( birthday.days === 0 ) return <Text style={{color: '#fff', fontWeight: 'bold'}}>Hoy es su cumplaños</Text>
        else return (
            <View style={styles.restDays}>
                <Text style={{fontWeight: 'bold'}}>{restDays} Días</Text>
            </View>
        )

    }
    
    // obtenemos el cumpleaños pasado
    const pasatBirthday = birthday.days > 0 ? true : false;

    return (
        <TouchableOpacity 
            style={[styles.card, pasatBirthday ? styles.past : birthday.days === 0 ? styles.actual : styles.current ]}
            onPress={() => deleteBirthday(birthday)}>

            <Text style={styles.text}>{birthday.name}  {birthday.lastname}</Text>

            { pasatBirthday ? <Text style={{color: '#fff'}}>Pasado</Text> : infoDays() }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15
    },
    text:{
        color: '#fff',
        fontSize: 16
    },
    actual: {
        backgroundColor: '#ffe227'
    },
    current: {
        backgroundColor: '#6930c3'
    },
    past: {
        backgroundColor: '#a20a0a'
    },
    restDays: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 20,
        alignItems: 'center',
        width: 60
    }
})
