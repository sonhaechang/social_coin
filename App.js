import React, { useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';

import { NavigationContainer } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import InNav from './navigators/InNav';
import OutNav from './navigators/OutNav';


const queryClient = new QueryClient();

export default function App() {
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		auth().onAuthStateChanged(user => {
			if (user) {
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			};
		});
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				{isLoggedIn ? <InNav /> : <OutNav />}
			</NavigationContainer>
		</QueryClientProvider>
	);
}