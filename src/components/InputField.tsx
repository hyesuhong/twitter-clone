import { useId } from 'react';
import styled from 'styled-components';

const Label = styled.label`
	font-size: 16px;
	font-weight: 500;
	line-height: 168%;
	text-transform: capitalize;
`;

const Input = styled.input`
	height: 40px;
	padding: 0 10px;

	background-color: transparent;
	border-radius: 4px;
	border: 1px solid white;
	outline: none;

	font-size: inherit;
	color: white;

	&[type='submit'] {
		background-color: white;
		color: black;
		border: none;

		&:hover {
			opacity: 0.8;
			cursor: pointer;
		}

		&:active {
			opacity: 0.6;
		}
	}
`;

interface Props extends React.AllHTMLAttributes<HTMLInputElement> {
	hasLabel?: boolean;
}

const InputField = ({ hasLabel, name, ...props }: Props) => {
	const id = useId();

	return (
		<>
			{hasLabel && <Label htmlFor={id}>{name}</Label>}
			<Input id={id} name={name} {...props} />
		</>
	);
};

export default InputField;
