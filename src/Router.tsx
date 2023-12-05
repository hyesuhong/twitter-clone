import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/basic/Home';
import Login from './routes/auth/Login';
import Join from './routes/auth/Join';
import ProtectedRoute from './components/ProtectedRoute';
import BasicLayout from './layouts/BasicLayout';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<BasicLayout />
			</ProtectedRoute>
		),
		children: [{ path: '', element: <Home /> }],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/join',
		element: <Join />,
	},
]);

export default router;
