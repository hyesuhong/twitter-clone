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
import { db } from '../firebase';
import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

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

		const { user } = credentials;

		await updateProfile(user, { displayName: name });

		await this.writeUserData({ name, uid: user.uid, email: user.email });
	}

	async loginWithEmail({ email, password }: authUserInfo) {
		const credentials = await signInWithEmailAndPassword(
			this.auth,
			email,
			password
		);
		const {
			user: { displayName, uid, email: uEmail },
		} = credentials;

		await this.writeUserData({ name: displayName, uid: uid, email: uEmail });
	}

	async loginWithSocial(type: socialType) {
		switch (type) {
			case 'GITHUB': {
				const provider = new GithubAuthProvider();
				const credentials = await signInWithPopup(this.auth, provider);

				const {
					user: { displayName, uid, email },
				} = credentials;

				await this.writeUserData({ name: displayName, uid: uid, email: email });

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

	private async writeUserData({
		uid,
		name,
		email = '',
	}: {
		uid: string;
		name: string | null;
		email: string | null;
	}) {
		const collectionRef = collection(db, 'users');
		const getUserQuery = query(collectionRef, where('uid', '==', uid));

		const querySnapshot = await getDocs(getUserQuery);

		if (querySnapshot.docs.length > 0) return;

		await addDoc(collection(db, 'users'), {
			name: name,
			uid: uid,
			email: email,
		});
	}
}
