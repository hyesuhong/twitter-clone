import AuthService from '../services/Auth';
import { Object, voidFn } from './common';

export type socialType = 'GITHUB';

export interface authUserInfo extends Object<string> {}
export interface joinUserInfo extends authUserInfo {}

export interface authProvider {
	authService: AuthService;
	children: React.ReactNode;
}

export interface authContextValues {
	join?: joinFn;
	loginWithEmail?: loginWithEmailFn;
	loginWithSocial?: loginWithSocialFn;
	cleanUpState?: voidFn;
	isLoading?: boolean;
	error?: string;
}

export type joinFn = (
	{ email, password, name }: joinUserInfo,
	successCallback: voidFn
) => Promise<void>;

export type loginWithEmailFn = (
	{ email, password }: authUserInfo,
	successCallback: voidFn
) => Promise<void>;

export type loginWithSocialFn = (
	type: socialType,
	successCallback: voidFn
) => Promise<void>;
