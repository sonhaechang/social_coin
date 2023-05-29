import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BLACK_COLOR } from '../colors';
import Home from '../screens/Home';
import Detail from '../screens/Detail';


const Nav = createNativeStackNavigator();

export default function InNav() {
    return (
        <Nav.Navigator
            screenOptions={{
                presentation: 'modal',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: BLACK_COLOR,
                },
            }}
        >
            <Nav.Screen name='코인' component={Home} />
            <Nav.Screen name='Detail' component={Detail} />
        </Nav.Navigator>
    );
}