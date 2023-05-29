import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styled from 'styled-components/native';

import { useQuery } from '@tanstack/react-query';

import { coins } from '../api';
import { BLACK_COLOR } from '../colors';
import Coin from '../components/Coin';


const Loader = styled.View`
    flex: 1;
    background-color: ${BLACK_COLOR};
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    background-color: ${BLACK_COLOR};
    flex: 1;
`;

const List = styled.FlatList`
    padding: 20px 10px;
    width: 100%;
`;

export default function Home() {
    const { isInitialLoading, data } = useQuery(['coins'], coins);
    const [cleanData, setCleanData] = useState([]);

    useEffect(() => {
        if (data) {
            setCleanData(data.filter(coin => (
                coin.rank != 0 && coin.is_active && !coin.is_new
            )));
        }
    }, [data]);

    if (isInitialLoading) { 
        return (
            <Loader>
                <ActivityIndicator color='white' />
            </Loader>
        )
    }

    return (
        <Container>
            <List 
                data={cleanData}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <Coin 
                        index={index}
                        id={item.id}
                        symbol={item.symbol} 
                    />
                )}
            />
        </Container>
    );
}