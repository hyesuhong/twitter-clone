import { Link } from 'react-router-dom';
import styled from 'styled-components';
import icoHome from '../assets/icons/ico-home.svg';
import icoBookmark from '../assets/icons/ico-bookmark.svg';
import icoCog from '../assets/icons/ico-cog.svg';

const Aside = styled.aside`
	width: 16.49vw;
`;

const Logo = styled.h1`
	font-size: 36px;
`;

const MenuList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 42px;
`;

const MenuItem = styled.li<{ $icon: 'home' | 'bookmark' | 'cog' }>`
	height: 48px;

	& > a {
		display: flex;
		align-items: center;
		padding: 0 20px;
		gap: 10px;
		height: 100%;

		color: white;
		text-decoration: none;

		--color: white;
		transition: background 0.3s;

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
			mask: ${({ $icon }) =>
					`url('${
						$icon === 'home'
							? icoHome
							: $icon === 'bookmark'
							? icoBookmark
							: icoCog
					}')`}
				no-repeat center center;
			mask-size: cover;
			-webkit-mask: ${({ $icon }) =>
					`url('${
						$icon === 'home'
							? icoHome
							: $icon === 'bookmark'
							? icoBookmark
							: icoCog
					}')`}
				no-repeat center center;
			-webkit-mask-size: cover;
		}
	}
`;

const SideMenu = () => {
	return (
		<Aside>
			<Logo>Logo</Logo>

			<MenuList>
				<MenuItem $icon='home'>
					<Link to='/'>Home</Link>
				</MenuItem>
				<MenuItem $icon='bookmark'>
					<Link to='/bookmarks'>Bookmarks</Link>
				</MenuItem>
				<MenuItem $icon='cog'>
					<Link to='/setting'>Setting</Link>
				</MenuItem>
			</MenuList>
		</Aside>
	);
};
export default SideMenu;
