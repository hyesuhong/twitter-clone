import styled from 'styled-components';

const DefaultBtn = styled.button<{ $size: size }>`
	width: 100%;
	height: ${(props) =>
		props.$size === 'L' ? '50px' : props.$size === 'M' ? '40px' : '30px'};

	border: none;
	border-radius: 4px;
	background: white;
	color: black;

	font-size: inherit;
	cursor: pointer;
`;

const Icon = styled.img`
	height: 50%;
	vertical-align: bottom;
	margin-right: 10px;
`;

type size = 'S' | 'M' | 'L';

type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	label: string;
	size?: size;
	icon?: string | SVGComponent;
}

const Button = ({ label, size = 'M', icon, ...props }: Props) => {
	return (
		<DefaultBtn $size={size} {...props}>
			{icon && (typeof icon === 'string' ? <Icon src={icon} /> : <>{icon}</>)}
			{label}
		</DefaultBtn>
	);
};

export default Button;
