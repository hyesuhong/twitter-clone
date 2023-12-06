import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import {
	authContextValues,
	authProvider,
	joinFn,
	loginWithEmailFn,
	loginWithSocialFn,
	socialType,
} from '../types/auth';

const AuthContext = createContext<authContextValues>({});

const AuthProvider = ({ authService, children }: authProvider) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const join = useCallback<joinFn>(
		async ({ email, password, name }, successCallback) => {
			setError('');
			try {
				setIsLoading(true);

				await authService.join({ email, password, name });

				successCallback();
			} catch (error) {
				const message = authService.getErrorMessage(error);
				setError(message);

				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[authService]
	);

	const loginWithEmail = useCallback<loginWithEmailFn>(
		async ({ email, password }, successCallback) => {
			setError('');
			try {
				setIsLoading(true);

				await authService.loginWithEmail({ email, password });

				successCallback();
			} catch (error) {
				const message = authService.getErrorMessage(error);
				setError(message);

				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[authService]
	);

	const loginWithSocial = useCallback<loginWithSocialFn>(
		async (type: socialType, successCallback) => {
			setError('');
			try {
				setIsLoading(true);

				await authService.loginWithSocial(type);

				successCallback();
			} catch (error) {
				const message = authService.getErrorMessage(error);
				setError(message);

				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[authService]
	);

	const cleanUpState = useCallback(() => {
		setIsLoading(false);
		setError('');
	}, []);

	const contextValue = useMemo(
		() => ({
			join,
			loginWithEmail,
			loginWithSocial,
			isLoading,
			error,
			cleanUpState,
		}),
		[join, loginWithEmail, loginWithSocial, isLoading, error, cleanUpState]
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
