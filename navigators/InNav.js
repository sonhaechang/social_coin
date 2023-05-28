import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';


const Nav = createNativeStackNavigator();

export default function InNav() {
    return (
        <Nav.Navigator>
            <Nav.Screen name='home' component={Home} />
        </Nav.Navigator>
    );
}