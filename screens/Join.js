import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';

import styled from 'styled-components/native';


const Container = styled.View``;

const Text = styled.Text``;

export default function Join() {
    const passwordInput = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onsubmitEmail = () => {
        passwordInput.current.focus();
    }

    return (
        <Container>
            <TextInput 
                value={email}
                autoCorrect={false}
                autoCapitalize='none'
                returnKeyType='next'
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={(text) => setEmail(text)}
                onSubmitEditing={onsubmitEmail}
            />

            <TextInput 
                value={password}
                ref={passwordInput}
                secureTextEntry
                placeholder='Password'
                returnKeyType='done'
                onChangeText={(text) => setPassword(text)} 
            />
        </Container>
    );
}