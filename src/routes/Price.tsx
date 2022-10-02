import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinTickers } from '../api';

const Change = styled.div`
	width: 100%;
	height: 80px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid ${(props) => props.theme.accentColor};
	border-radius: 10px;
	padding: 10px 20px;
	margin-bottom: 10px;

	font-size: 24px;
	font-weight: 700;

	span:first-child {
		color: #fff;
		font-size: 16px;
	}
`;

interface RouteParams {
	coinId: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

function Price() {
	const { coinId } = useParams<RouteParams>();
	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
		['tickers', coinId],
		() => fetchCoinTickers(coinId),
		{
			refetchInterval: 5000,
		}
	);
	return (
		<div>
			{tickersLoading ? (
				'Loading...'
			) : (
				<>
					<Change>
						<span>Percent Change (30 minutes)</span>
						<span>{tickersData?.quotes.USD.percent_change_30m}</span>
					</Change>

					<Change>
						<span>Percent Change (12 hours)</span>
						<span>{tickersData?.quotes.USD.percent_change_12h}</span>
					</Change>

					<Change>
						<span>Percent Change (24 hours)</span>
						<span>{tickersData?.quotes.USD.market_cap_change_24h}</span>
					</Change>

					<Change>
						<span>Percent Change (7 days)</span>
						<span>{tickersData?.quotes.USD.percent_change_7d}</span>
					</Change>

					<Change>
						<span>Percent Change (30 days)</span>
						<span>{tickersData?.quotes.USD.percent_change_30d}</span>
					</Change>

					<Change>
						<span>Percent Change (1 year)</span>
						<span>{tickersData?.quotes.USD.percent_change_1y}</span>
					</Change>
				</>
			)}
		</div>
	);
}

export default Price;
