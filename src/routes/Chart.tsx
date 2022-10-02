import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
	IsDark: boolean;
}

function Chart({ coinId, IsDark }: ChartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>(
		['ohlcv', coinId],
		() => fetchCoinHistory(coinId),
		{
			refetchInterval: 10000,
		}
	);
	return (
		<div>
			{isLoading ? (
				'Loading chart...'
			) : (
				<ApexChart
					type='candlestick'
					series={
						[
							{
								data: data?.map((price) => ({
									x: price.time_close,
									y: [price.open, price.high, price.low, price.close],
								})),
							},
						] as any
					}
					options={{
						theme: {
							mode: IsDark ? 'dark' : 'light',
						},
						chart: {
							height: 500,
							width: 500,
							toolbar: {
								show: true,
							},
							background: 'transparent',
						},
						grid: { show: false },
						// // 	stroke: {
						// // 		curve: 'smooth',
						// // 		width: 4,
						// // },
						yaxis: { show: true },
						xaxis: {
							axisBorder: { show: true },
							axisTicks: { show: true },
							labels: { show: true },
							type: 'datetime',
							categories: data?.map((price) =>
								new Date(+price.time_close * 1000).toUTCString()
							),
						},
						colors: ['#0fbcf9'],
						tooltip: {
							y: {
								formatter: (value) => `$ ${value.toFixed(3)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
