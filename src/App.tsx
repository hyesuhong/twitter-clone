import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import router from './Router';

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

function App() {
	return (
		<>
			<GlobalStyle />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
