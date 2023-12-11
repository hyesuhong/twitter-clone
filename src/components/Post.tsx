import styled from 'styled-components';
import icoUser from '../assets/icons/ico-user.svg';
import { auth, db, storage } from '../firebase';
import { useRef, useState } from 'react';
import Button from './Button';
import { deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	padding: 10px;
	border: 1px solid white;
`;

const User = styled.div`
	display: grid;
	grid-template-columns: minmax(0, max-content) 1fr;
	align-items: center;

	& > a {
		display: flex;
		align-items: center;
		min-width: 0;
		white-space: nowrap;
		gap: 16px;
		color: white;
		text-decoration: none;
	}
`;

const Profile = styled.span`
	flex: 0 0 40px;
	height: 40px;
	background: white;
	mask: url(${icoUser}) no-repeat center center;
	mask-size: cover;
	-webkit-mask: url(${icoUser}) no-repeat center center;
	-webkit-mask-size: cover;
`;

const Date = styled.span`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-left: 8px;

	font-size: 12px;
	opacity: 0.7;

	&::before {
		content: '';
		width: 4px;
		height: 4px;
		border-radius: 4px;
		background: rgb(255 255 255 / 0.7);
	}
`;

const ImgWrapper = styled.div`
	text-align: center;
	margin: 20px 0;
`;

const Img = styled.img`
	max-width: 100%;
	max-height: 200px;
`;

const Text = styled.p`
	margin-top: 20px;
`;

const Textarea = styled.textarea`
	width: 100%;
	height: 160px;
	border: 1px solid white;
	background: none;
	color: white;
	resize: none;
`;

const BtnArea = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	margin-top: 20px;

	& > button {
		flex: 0 0 60px;
	}
`;

export interface post {
	id: string;
	createdAt: number;
	imgUrl?: string;
	text: string;
	userId: string;
	username: string;
}

const Post = ({ id, createdAt, imgUrl, text, userId, username }: post) => {
	const user = auth.currentUser;
	const isEditable = user && userId === user.uid;
	const [edit, setEdit] = useState(false);
	const [editText, setEditText] = useState(text);

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const onDeleteClick = async () => {
		const ok = confirm('Are you sure you want to delete Post?');

		if (!ok || !isEditable) {
			return;
		}

		try {
			await deleteDoc(doc(db, 'posts', id));

			if (imgUrl) {
				const imgRef = ref(storage, `posts/${user.uid}/${id}`);
				await deleteObject(imgRef);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onEditClick = () => {
		setEdit(true);
		setTimeout(() => {
			textareaRef.current && textareaRef.current.focus();
		}, 200);
	};

	const onEditTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
		const {
			target: { value },
		} = ev;

		setEditText(value);
	};

	const onUpdateClick = async () => {
		try {
			const res = await updateDoc(doc(db, 'posts', id), { text: editText });
			console.log(res);
			setEdit(false);
		} catch (error) {
			console.error(error);
		}
	};

	const onCancelClick = () => {
		setEditText(text);
		setEdit(false);
	};

	return (
		<Wrapper data-user={userId} data-id={id}>
			<User>
				<Link to={`/profile/${userId}`}>
					<Profile />
					<span>{username}</span>
				</Link>
				<Date>{createdAt}</Date>
			</User>
			{imgUrl && (
				<ImgWrapper>
					<Img src={imgUrl} alt='' />
				</ImgWrapper>
			)}
			{edit ? (
				<>
					<Textarea
						value={editText}
						onChange={onEditTextChange}
						ref={textareaRef}
					/>

					<BtnArea>
						<Button label='Update' size='S' onClick={onUpdateClick} />
						<Button label='Cancel' size='S' onClick={onCancelClick} />
					</BtnArea>
				</>
			) : (
				<>
					<Text>{text}</Text>
					{isEditable && (
						<BtnArea>
							<Button label='Edit' size='S' onClick={onEditClick} />
							<Button label='Delete' size='S' onClick={onDeleteClick} />
						</BtnArea>
					)}
				</>
			)}
		</Wrapper>
	);
};

export default Post;
