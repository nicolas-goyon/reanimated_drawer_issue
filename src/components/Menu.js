import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login, Notifications, PlaceCreation, Places, Profil, ProfilEdit,Register, Requests,Reservations,Reserve } from '../screens';

const Drawer = createDrawerNavigator();


export default function Menu() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Register">    
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />                  
        </Drawer.Navigator>
      </NavigationContainer>
    );
}