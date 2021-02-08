import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ActionBar(props) {

    const { showList, setShowList, logout } = props;

    return (
        <View style={styles.viewFooter}>
            
            <TouchableOpacity style={styles.btnClose} onPress={logout}>
                <Text style={styles.textBar}>Cerrar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnAddDate} onPress={() => setShowList(!showList)}>
                <Text style={styles.textBar}>
                    
                    { showList ? "Nueva fecha" : "Cancelar fecha" }
                    
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        marginBottom: 10,
        
    },
    btnClose: {
        backgroundColor: '#a20a0a',
        borderRadius: 50,
        paddingHorizontal: 35,
        paddingVertical: 12
    },
    btnAddDate: {
        backgroundColor: '#6930c3',// azul clarito
        borderRadius: 50,
        paddingHorizontal: 35,
        paddingVertical: 12
    },
    textBar: {
        color: '#fff',
        fontSize: 18

    }
})
