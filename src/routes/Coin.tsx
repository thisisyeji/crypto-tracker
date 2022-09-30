import { useParams } from 'react-router';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { info } from 'console';

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
	const [Info, setInfo] = useState({});
	const [PriceInfo, setPriceInfo] = useState({});

	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			const priceData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();
			setInfo(infoData);
			setPriceInfo(priceData);
		})();
	}, []);

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
