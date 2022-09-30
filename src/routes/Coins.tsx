import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: White;
	color: ${(props) => props.theme.bgColor};
	padding: 20px;
	border-radius: 15px;
	margin-bottom: 10px;

	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
	}

	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

interface CoinInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const [Coins, setCoins] = useState<CoinInterface[]>([]);
	const [Loading, setLoading] = useState(true);

	// Using axios & async-await
	const getCoins = async () => {
		const res = await axios.get('https://api.coinpaprika.com/v1/coins');
		setCoins(res.data.slice(0, 100));
		setLoading(false);
	};
	useEffect(() => {
		// (async () => {
		// 	const response = await fetch('https://api.coinpaprika.com/v1/coins');
		// 	const json = await response.json();
		// 	setCoins(json.slice(0, 100));
		// 	setLoading(false);
		// })();

		getCoins();
	}, []);

	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			{Loading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{Coins.map((coin) => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`} state={coin.name}>
								<Img
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
									alt='symbol'
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
