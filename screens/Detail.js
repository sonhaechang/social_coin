import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { useQuery } from '@tanstack/react-query';

import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';

import { Icon, IconBaseUrl } from "../components/Coin";
import { info, history } from '../api';
import { BLACK_COLOR } from '../colors';


const Container = styled.ScrollView`
    background-color: ${BLACK_COLOR};
`;

export default function Detail({
    navigation,
    route: { params: { symbol, id }, },
}) {
    const [victoryData, setVictoryData] = useState(null);

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

    useEffect(() => {
        if (historyData) {
            setVictoryData(
                historyData.map((price) => ({
                    x: new Date(price.timestamp).getTime(),
                    y: price.price,
                }))
            );
        }
    }, [historyData]);

    return (
        <Container>
            {
                victoryData ? (
                    <VictoryChart height={360}>
                        <VictoryLine 
                            animate
                            data={victoryData} 
                            style={{ data: {stroke: '#1abc9c'} }}
                            interpolation='monotoneX'
                        />

                        <VictoryScatter 
                            data={victoryData}
                            style={{ data: {fill: '#1abc9c'} }}
                        />
                    </VictoryChart>
                ) : null
            }
        </Container>
    );
}