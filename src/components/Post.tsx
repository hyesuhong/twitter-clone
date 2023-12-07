import styled from 'styled-components';
import icoUser from '../assets/icons/ico-user.svg';

const Wrapper = styled.div`
	padding: 10px;
	border: 1px solid white;
`;

const User = styled.div`
	display: flex;
	align-items: center;
`;

const Profile = styled.span`
	flex: 0 0 40px;
	height: 40px;
	background: white;
	mask: url(${icoUser}) no-repeat center center;
	mask-size: cover;
	-webkit-mask: url(${icoUser}) no-repeat center center;
	-webkit-mask-size: cover;
	margin-right: 16px;
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
`;

const Text = styled.p`
	margin-top: 20px;
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
	return (
		<Wrapper data-user={userId} data-id={id}>
			<User>
				<Profile />
				{username}
				<Date>{createdAt}</Date>
			</User>
			{imgUrl && (
				<ImgWrapper>
					<Img src={imgUrl} alt='' />
				</ImgWrapper>
			)}
			<Text>{text}</Text>
		</Wrapper>
	);
};

export default Post;
