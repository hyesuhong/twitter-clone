import styled from 'styled-components';

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;
	background: black;
`;

const Text = styled.span`
	font-size: xx-large;
`;

const Loading = () => {
	return (
		<Wrapper>
			<Text>Loading...</Text>
		</Wrapper>
	);
};

export default Loading;
