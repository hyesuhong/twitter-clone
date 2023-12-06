import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import styled from 'styled-components';
import SideSearch from '../components/SideSearch';
import SideProfile from '../components/SideProfile';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	width: min(100%, 1400px);
	padding: 32px 20px;

	& > main {
		flex: 1;
	}
`;

const RightSide = styled.aside`
	display: grid;
	grid-template-rows: 1fr max-content;
	gap: 32px;
	width: 16.49vw;
`;

const BasicLayout = () => {
	return (
		<>
			<Wrapper>
				<SideMenu />
				<main>
					<Outlet />
				</main>
				<RightSide>
					<SideSearch />
					<SideProfile />
				</RightSide>
			</Wrapper>
		</>
	);
};

export default BasicLayout;
