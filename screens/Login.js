import React from 'react';

import styled from 'styled-components/native';


const Container = styled.View``;

const Text = styled.Text``;

const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;

export default function Login({ navigation: { navigate } }) {
    return (
        <Container>
            <Text>
                Don't have an account? 
                <Btn onPress={() => navigate('Join')}>
                    <BtnText>Join</BtnText>
                </Btn>
            </Text>
        </Container>
    );
}