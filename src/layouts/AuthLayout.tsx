import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Wrapper = styled.main`
	flex: 1;
	max-width: 430px;
	padding-top: 30px;
`;

const Title = styled.h1`
	font-size: 56px;
	font-weight: 700;
	line-height: 128%;
	text-align: center;
`;

const Social = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;

	margin: 30px 0;

	&::after {
		content: 'OR';
		margin-top: 20px;
	}
`;

const Form = styled.form`
	margin: 20px 0;
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 20px;
	& > li {
		display: flex;
		flex-direction: column;

		&:last-child {
			margin-top: 20px;
		}
	}
`;

const Switcher = styled.div`
	margin-top: 20px;
	padding-top: 20px;
	border-top: 1px solid grey;

	& a {
		color: inherit;
		font-weight: 500;

		&:hover {
			color: skyblue;
		}
	}
`;

type InitialInput = { name: string; type: string; initial: string };

interface Props {
	type: 'LOGIN' | 'JOIN';
	inputs: InitialInput[];
	switcher: {
		forwardText: string;
		target: {
			path: string;
			text: string;
		};
	};
}

const AuthLayout = ({ type, inputs, switcher }: Props) => {
	const pageTitle = type[0] + type.slice(1).toLowerCase();
	return (
		<Wrapper>
			<Title>{pageTitle}</Title>
			<Social>
				<Button label='Continue with Github' />
			</Social>

			<Form>
				<List>
					{inputs.map(({ type, name }, index) => (
						<li key={index}>
							<InputField
								hasLabel
								type={type}
								name={name}
								value={''}
								required
							/>
						</li>
					))}
					<li>
						<InputField type='submit' value={pageTitle} />
					</li>
				</List>
			</Form>

			<Switcher>
				<p>
					{switcher.forwardText}{' '}
					<Link to={switcher.target.path}>{switcher.target.text}</Link>
				</p>
			</Switcher>
		</Wrapper>
	);
};

export default AuthLayout;
