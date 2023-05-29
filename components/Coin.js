import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components/native';


const Wrapper = styled(Animated.createAnimatedComponent(View))`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 5px;
      align-items: center;
`;
const CoinName = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
`;

export const Icon = styled.Image`
    border-radius: 20px;
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
`;

export const IconBaseUrl = 'https://coinicons-api.vercel.app/api/icon/';

export default function Coin({ index, id, symbol }) {
    const navigation = useNavigation();
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1],
    });

    useEffect(() => {
        Animated.spring(opacity, {
            toValue: 1,
            useNativeDriver: true,
            delay: index * 100,
        }).start();
    }, []);

    return (
        <TouchableOpacity
            style={{ flex: 0.31, }}
            onPress={() => navigation.navigate('Detail', { symbol, id })}
        >
            <Wrapper 
                style={{ 
                    opacity ,
                    transform: [{ scale }]
                }}>
                <Icon 
                    source={{ uri: `${IconBaseUrl}${symbol.toLowerCase()}` }} 
                />
                <CoinName>{symbol}</CoinName>
            </Wrapper>
        </TouchableOpacity>
    )
};