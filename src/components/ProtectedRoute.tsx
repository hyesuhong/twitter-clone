import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
	const user = auth.currentUser;

	if (!user) {
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
