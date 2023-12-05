import {
	Auth,
	GithubAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { authUserInfo, joinUserInfo, socialType } from '../types/auth';
import { errorMsg } from '../constants/message';

export default class AuthService {
	readonly auth: Auth;

	constructor(auth: Auth) {
		this.auth = auth;
	}

	async join({ email, password, name }: joinUserInfo) {
		const credentials = await createUserWithEmailAndPassword(
			this.auth,
			email,
			password
		);

		await updateProfile(credentials.user, { displayName: name });
	}

	async loginWithEmail({ email, password }: authUserInfo) {
		await signInWithEmailAndPassword(this.auth, email, password);
	}

	async loginWithSocial(type: socialType) {
		switch (type) {
			case 'GITHUB': {
				const provider = new GithubAuthProvider();
				await signInWithPopup(this.auth, provider);
				break;
			}
		}
	}

	getErrorMessage(error: unknown) {
		if (error instanceof FirebaseError) {
			return errorMsg.Firebase[error.code] || error.message;
		} else {
			const e = error as Error;
			return e.message;
		}
	}
}
