import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet-async';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: ${(props) => props.theme.cardBgColor};
	color: ${(props) => props.theme.textColor};
	border: 1px solid white;
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

const ThemeBtn = styled.button`
	width: 50px;
	height: 50px;
	font-size: 24px;
	line-height: 50px;
	border-radius: 50%;
	border: 1px solid ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.textColor};
	margin: 10px;
	cursor: pointer;

	position: fixed;
	bottom: 20px;
	left: 20px;
	transition: 0.2s;

	&:hover {
		border: 1px solid ${(props) => props.theme.accentColor};
		background-color: ${(props) => props.theme.accentColor};
	}
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

interface ICoinProps {}

function Coins({}: ICoinProps) {
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
	const isDark = useRecoilValue(isDarkAtom);
	const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
	/*
	const [coins, setCoins] = useState<CoinInterface[]>([]);
	const [loading, setLoading] = useState(true);

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
	*/

	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
				<ThemeBtn onClick={toggleDarkAtom}>{isDark ? '🌞' : '🌙'}</ThemeBtn>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: { name: coin.name },
								}}>
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
