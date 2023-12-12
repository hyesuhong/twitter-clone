import {
	DocumentReference,
	collection,
	getDocs,
	query,
	updateDoc,
	where,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { auth, db, storage } from '../../firebase';
import icoUser from '../../assets/icons/ico-user.svg';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import Loading from '../../components/Loading';
import { updateProfile } from '@firebase/auth';

const Wrapper = styled.div``;

const Cover = styled.div`
	height: 240px;
	background: rgb(255 255 255 / 0.7);
`;

const UserInfo = styled.div`
	position: relative;
	padding: 56px 16px 16px;
	border: 1px solid white;
	border-top-color: rgb(255 255 255 / 0.7);
`;

const Avatar = styled.div`
	position: absolute;
	top: -80px;
	left: 16px;
	width: 120px;
	height: 120px;
	border-radius: 50%;
	overflow: hidden;

	& > input {
		display: none;
	}
`;

const AvatarImg = styled.span`
	display: block;
	width: 100%;
	height: 100%;
	background: black;

	&.empty::before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background: white;
		mask: url(${icoUser}) no-repeat center center;
		mask-size: 130%;
		-webkit-mask: url(${icoUser}) no-repeat center center;
		-webkit-mask-size: 130%;
	}

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Info = styled.h3`
	font-size: 32px;
`;

interface userData {
	uid: string;
	email: string | null;
	name: string | null;
	profileUrl?: string;
}

const Profile = () => {
	const { id } = useParams();
	const user = auth.currentUser;
	const [isLoading, setIsLoading] = useState(false);
	const [userRef, setUserRef] = useState<DocumentReference>();
	const [userData, setUserData] = useState<userData>();

	const getUser = async (id: string) => {
		const collectionRef = collection(db, 'users');
		const getUserQuery = query(collectionRef, where('uid', '==', id));

		const querySnapshot = await getDocs(getUserQuery);

		if (querySnapshot.docs.length < 1) return;

		const ref = querySnapshot.docs[0].ref;
		setUserRef(ref);

		const data = querySnapshot.docs[0].data();
		setUserData(data as userData);
	};

	const changeProfileImg = async (ev: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = ev;

		if (!files || files.length < 1 || !userData || !userRef) return;
		if (userData.uid !== user?.uid) return;

		setIsLoading(true);

		const [file] = files;
		const locationRef = ref(storage, `profiles/${userData.uid}`);

		const uploadedFile = await uploadBytes(locationRef, file);
		const fileInfo = await getDownloadURL(uploadedFile.ref);

		await updateProfile(user, {
			photoURL: fileInfo,
		});
		await updateDoc(userRef, { profileUrl: fileInfo });

		setUserData((prev) => (prev ? { ...prev, profileUrl: fileInfo } : prev));

		setIsLoading(false);
	};

	useEffect(() => {
		id && getUser(id);
	}, [id]);

	return (
		<>
			<Wrapper>
				<Cover></Cover>
				<UserInfo>
					<Avatar>
						{userData?.uid === user?.uid ? (
							<>
								<input
									type='file'
									id='profile-image'
									accept='image/*'
									onChange={changeProfileImg}
								/>
								<AvatarImg
									as='label'
									htmlFor='profile-image'
									className={!userData?.profileUrl ? 'empty' : ''}
								>
									{userData?.profileUrl && (
										<img src={userData.profileUrl} alt='' />
									)}
								</AvatarImg>
							</>
						) : (
							<AvatarImg className={!userData?.profileUrl ? 'empty' : ''}>
								{userData?.profileUrl && (
									<img src={userData.profileUrl} alt='' />
								)}
							</AvatarImg>
						)}
					</Avatar>
					<Info>{userData?.name}</Info>
				</UserInfo>
			</Wrapper>
			{isLoading && <Loading />}
		</>
	);
};
export default Profile;
