import { useParams } from 'react-router';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

interface LocationState {
	state: string;
}

function Coin() {
	const [Loading, setLoading] = useState(true);
	const { coinId } = useParams();
	const { state } = useLocation() as LocationState;
	console.log(state);

	return (
		<Container>
			<Header>
				<Title>{state || 'Loading...'}</Title>
			</Header>
			{Loading ? <Loader>Loading...</Loader> : null}
		</Container>
	);
}
export default Coin;
