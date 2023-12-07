import styled from 'styled-components';
import icoUser from '../assets/icons/ico-user.svg';
import icoPhoto from '../assets/icons/ico-photo.svg';
import { useState } from 'react';
import { addDoc, collection, updateDoc } from '@firebase/firestore';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	border: 1px solid white;
	padding: 10px;
`;

const Profile = styled.span`
	display: flex;
	align-items: center;
	gap: 4px;

	&::before {
		content: '';
		flex: 0 0 40px;
		height: 40px;
		background: white;
		mask: url(${icoUser}) no-repeat center center;
		mask-size: cover;
		-webkit-mask: url(${icoUser}) no-repeat center center;
		-webkit-mask-size: cover;
	}
`;

const Form = styled.form``;

const Textarea = styled.textarea`
	width: 100%;
	height: 160px;
	border: 1px solid white;
	background: none;
	color: white;
	resize: none;
`;

const ManageArea = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
`;

const ImgFileLabel = styled.label<{ $selected?: boolean }>`
	width: 30px;
	height: 30px;
	border-radius: 50%;

	background-color: ${({ $selected }) => ($selected ? 'skyblue' : 'white')};
	mask: url(${icoPhoto}) no-repeat center center;
	mask-size: 80%;
	mask-clip: content-box;
	-webkit-mask: url(${icoPhoto}) no-repeat center center;
	-webkit-mask-size: 80%;
	-webkit-mask-clip: content-box;

	cursor: pointer;
`;

const ImgFileInput = styled.input`
	display: none;
`;

const SubmitBtn = styled.button`
	background: white;
	color: black;
	height: 30px;
	padding: 0 10px;
	border: none;
`;

const PostTweetForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [text, setText] = useState('');
	const [file, setFile] = useState<File | null>();

	const onTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
		const {
			target: { value },
		} = ev;

		setText(value);
	};

	const onFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = ev;

		if (files && files.length > 0) {
			setFile(files[0]);
		}
	};

	const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const user = auth.currentUser;
		if (isLoading || text === '' || !user) return;

		try {
			setIsLoading(true);

			const post = await addDoc(collection(db, 'tweets'), {
				text,
				createdAt: Date.now(),
				username: user.displayName || 'Anonymous',
				userId: user.uid,
			});

			if (file) {
				const locationRef = ref(storage, `tweets/${user.uid}/${post.id}`);
				const uploadedFile = await uploadBytes(locationRef, file);
				const fileInfo = await getDownloadURL(uploadedFile.ref);

				await updateDoc(post, { imgUrl: fileInfo });
			}

			setText('');
			setFile(null);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Wrapper>
			<Profile>Username</Profile>
			<Form onSubmit={onSubmit}>
				<Textarea value={text} onChange={onTextChange} />
				<ManageArea>
					<ImgFileLabel htmlFor='post-image' $selected={Boolean(file)} />
					<ImgFileInput
						id='post-image'
						type='file'
						accept='image/*'
						onChange={onFileChange}
					/>
					<SubmitBtn>{isLoading ? 'Posting...' : 'Post'}</SubmitBtn>
				</ManageArea>
			</Form>
		</Wrapper>
	);
};

export default PostTweetForm;
