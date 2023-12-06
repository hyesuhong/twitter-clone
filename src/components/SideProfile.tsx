import styled from 'styled-components';
import icoUser from '../assets/icons/ico-user.svg';
import icoLogout from '../assets/icons/ico-out.svg';

const Wrapper = styled.div`
	dt {
		display: flex;
		align-items: center;
		gap: 4px;

		padding: 10px;

		& > span {
			flex: 0 0 40px;
			height: 40px;
			background: white;
			mask: url(${icoUser}) no-repeat center center;
			mask-size: cover;
			-webkit-mask: url(${icoUser}) no-repeat center center;
			-webkit-mask-size: cover;
		}
	}

	dd ul {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		padding: 10px;

		& > li {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 4px;

			& span {
				font-size: 20px;
				font-weight: 700;
			}
		}
	}
`;

const LogoutBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 10px;

	width: 100%;
	height: 48px;
	margin-top: 10px;
	padding: 0 20px;

	background: transparent;
	border: none;
	outline: none;
	color: white;
	--color: white;

	transition: background 0.3s;
	cursor: pointer;

	&:hover {
		background: rgb(255 255 255 / 0.5);
		color: skyblue;
		--color: skyblue;
	}

	&::before {
		content: '';
		flex: 0 0 32px;
		height: 32px;
		background: var(--color);
		mask: url(${icoLogout}) no-repeat center center;
		mask-size: cover;
		-webkit-mask: url(${icoLogout}) no-repeat center center;
		-webkit-mask-size: cover;
	}
`;

const SideProfile = () => {
	return (
		<Wrapper>
			<dl>
				<dt>
					<span></span>Username
				</dt>
				<dd>
					<ul>
						<li>
							<span>0</span>Posts
						</li>
						<li>
							<span>0</span>Marks
						</li>
					</ul>
				</dd>
			</dl>
			<LogoutBtn>Logout</LogoutBtn>
		</Wrapper>
	);
};

export default SideProfile;
