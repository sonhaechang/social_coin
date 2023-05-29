import React, { useEffect } from 'react';

import styled from 'styled-components/native';

import { useQuery } from '@tanstack/react-query';

import { Icon, IconBaseUrl } from "../components/Coin";
import { info, history } from '../api';


const Container = styled.View``;

export default function Detail({
    navigation,
    route: { params: { symbol, id }, },
}) {
    const {
        isInitialLoading: infoLoading,
        data: infoData
    } = useQuery({
        queryKey: ['coinInfo', id], 
        queryFn: info,
    });

    const {
        isInitialLoading: historyLoading,
        data: historyData
    } = useQuery({
        queryKey: ['coinHistory', id], 
        queryFn: history,
    });
 
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Icon 
                    source={{ uri: `${IconBaseUrl}${symbol.toLowerCase()}` }} 
                />
            ),
        });
    }, []);

    return (
        <Container></Container>
    );
}