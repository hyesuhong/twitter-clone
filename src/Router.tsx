import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/basic/Home';
import Login from './routes/auth/Login';
import Join from './routes/auth/Join';
import ProtectedRoute from './components/ProtectedRoute';
import BasicLayout from './layouts/BasicLayout';
import Profile from './routes/basic/Profile';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<BasicLayout />
			</ProtectedRoute>
		),
		children: [
			{ path: '', element: <Home /> },
			{ path: 'profile/:id', element: <Profile /> },
		],
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
