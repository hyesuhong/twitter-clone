import AuthLayout from '../../layouts/AuthLayout';

const Login = () => {
	const inputs = [
		{ name: 'email', type: 'email', initial: '' },
		{ name: 'password', type: 'password', initial: '' },
	];

	const pageSwith = {
		forwardText: 'Don’t have an account?',
		target: {
			path: '/join',
			text: 'Join',
		},
	};

	return <AuthLayout type='LOGIN' inputs={inputs} switcher={pageSwith} />;
};

export default Login;
