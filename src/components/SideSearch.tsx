import styled from 'styled-components';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: min-content minmax(0, 1fr);
	gap: 20px;

	& > input {
		height: 40px;
	}
`;

const SideSearch = () => {
	return (
		<Wrapper>
			<input type='text' />
			<ul>
				<li>list</li>
			</ul>
		</Wrapper>
	);
};

export default SideSearch;
