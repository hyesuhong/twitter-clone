import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import router from './Router';
import AuthProvider from './contexts/AuthContext';
import AuthService from './services/Auth';
import { auth } from './firebase';
import Loading from './components/Loading';

const GlobalStyle = createGlobalStyle`
	${reset}

	* {
    box-sizing: border-box;
  }

  body {
    background-color: black;
    color:white;
    font-family:'Raleway', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		height: 100vh;
		min-height: 100vh;

		& > div {
			display: flex;
			justify-content: center;
			height: 100%;
		}
  }
`;

const authService = new AuthService(auth);

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const init = async () => {
		await auth.authStateReady().catch(console.error);
		setIsLoading(false);
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<>
			<GlobalStyle />
			{isLoading ? (
				<Loading />
			) : (
				<AuthProvider authService={authService}>
					<RouterProvider router={router} />
				</AuthProvider>
			)}
		</>
	);
}

export default App;
