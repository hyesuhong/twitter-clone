import styled from 'styled-components';
import PostTweetForm from '../../components/PostTweetForm';
import Timeline from '../../components/Timeline';

const Wrapper = styled.div`
	display: grid;
	grid-auto-rows: min-content;
	gap: 30px;
`;

const Home = () => {
	return (
		<>
			<Wrapper>
				<PostTweetForm />
				<Timeline />
			</Wrapper>
		</>
	);
};

export default Home;
