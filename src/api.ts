import axios from 'axios';

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
	const res = await axios.get(`${BASE_URL}/coins`);
	return res.data;
}

export async function fetchCoinInfo(coinId: string) {
	const res = await axios.get(`${BASE_URL}/coins/${coinId}`);
	return res.data;
}

export async function fetchCoinTickers(coinId: string) {
	const res = await axios.get(`${BASE_URL}/tickers/${coinId}`);
	return res.data;
}

export async function fetchCoinHistory(coinId: string) {
	// const endDate = Math.floor(Date.now() / 1000);
	// const startDate = endDate - 60 * 60 * 24 * 7;
	const res = await axios.get(
		`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
	);
	return res.data;
}
