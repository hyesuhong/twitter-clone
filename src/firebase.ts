import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCquTB1qEQfJm1QFyvUuJPjWH8z1Ps8sog',
	authDomain: 'twitter-clone-af4b9.firebaseapp.com',
	projectId: 'twitter-clone-af4b9',
	storageBucket: 'twitter-clone-af4b9.appspot.com',
	messagingSenderId: '87949891565',
	appId: '1:87949891565:web:e5f7570dae5c35b0a9b9e4',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
