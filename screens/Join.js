import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import styled from 'styled-components/native';

import auth from '@react-native-firebase/auth';

import { BLACK_COLOR } from "../colors";


const Container = styled.View`
    background-color: ${BLACK_COLOR};
    flex: 1;
    align-items: center;
    color: white;
    padding: 60px 20px;
`;

const TextInput = styled.TextInput`
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
`;

const Btn = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 20px;
    border-width: 1px;
    border-radius: 20px;
    border-color: rgba(255, 255, 255, 0.5);
    justify-content: center;
    align-items: center;
`;

const BtnText = styled.Text`
    color: white;
    font-size: 16px;
`;

export default function Join() {
    const passwordInput = useRef();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitEmailEditing = () => {
        passwordInput.current.focus();
    }

    const onSubmitPassworldEditing = async () => {
        if (email === '' || password === '') {
            return Alert.alert('Fill in the form.');
        }

        if (loading) { return; }

        setLoading(true);

        try {
            await auth().createUserWithEmailAndPassword(
                email,
                password
            );
        } catch(e) {
            switch(e.code) {
                case 'auth/weak-password': {
                    Alert.alert('Write a stronger password!');
                }
            }
        }

        
    };

    return (
        <Container>
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={email}
                returnKeyType="next"
                onChangeText={(text) => setEmail(text)}
                onSubmitEditing={onSubmitEmailEditing}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            />

            <TextInput
                ref={passwordInput}
                placeholder="Password"
                secureTextEntry
                value={password}
                returnKeyType="done"
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={onSubmitPassworldEditing}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            />

            <Btn onPress={onSubmitPassworldEditing}>
                {
                    loading ? (
                        <ActivityIndicator 
                            color='white' 
                        /> 
                    ) : (
                        <BtnText>Create Account</BtnText>
                    )
                }
            </Btn>
        </Container>
    );
}