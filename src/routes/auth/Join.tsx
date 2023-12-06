import AuthLayout from '../../layouts/AuthLayout';

const Join = () => {
	const inputs = [
		{ name: 'name', type: 'text', initial: '' },
		{ name: 'email', type: 'email', initial: '' },
		{ name: 'password', type: 'password', initial: '' },
	];

	const pageSwith = {
		forwardText: 'Already have an account?',
		target: {
			path: '/login',
			text: 'Login',
		},
	};

	return <AuthLayout type='JOIN' inputs={inputs} switcher={pageSwith} />;
};

export default Join;
