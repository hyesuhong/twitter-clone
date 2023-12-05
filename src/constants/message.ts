import { Object } from '../types/common';

type errorMessage = {
	Firebase: Object<string>;
};

export const errorMsg: errorMessage = {
	Firebase: {
		// https://firebase.google.com/docs/reference/js/auth#autherrorcodes
		'auth/email-already-in-use': 'This email already exists.',
		'auth/weak-password': 'Password should be at least 6 characters.',
		'auth/invalid-login-credentials': 'Invalid email or password.',
		'auth/cancelled-popup-request': 'Cancelled with your social account',
		'auth/user-cancelled': 'Cancelled with your social account',
		'auth/popup-closed-by-user)': 'Cancelled with your social account',
		'auth/account-exists-with-different-credential':
			'This email already exists.',
	},
};
