import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import firebase from './src/utils/firebase';
import { encode, decode } from 'base-64';
import 'firebase/auth';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';

// Para que no de fallo al crear colecciones en firebase, debemos añadir las siguientes lineas
if ( !global.btoa ) global.btoa = encode;
if ( !global.atob ) global.atob = decode;

export default function App() {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {

      setUser(response);

    })
  }, [user]);

  // funcion para cerrar sesión
  const logout = () => {

    firebase.auth().signOut();

  }

  if ( user === undefined ) return null;

  return (

    <>
      <StatusBar barStyle="light-content"/>
      
      <SafeAreaView style={styles.background}>
        
        { user ? <ListBirthday user={user} logout={logout} /> : <Auth /> }

      </SafeAreaView>
    </>
  );

}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%'
  }
});