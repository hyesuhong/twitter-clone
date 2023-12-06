import styled from 'styled-components';

const Text = styled.p`
	color: tomato;
`;

interface Props {
	text: string;
}

const ErrorMessage = ({ text }: Props) => {
	return <Text>{text}</Text>;
};

export default ErrorMessage;
