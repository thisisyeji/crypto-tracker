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
}

function Chart({ coinId }: ChartProps) {
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
					type='line'
					series={[
						{
							name: 'price',
							data: data?.map((price) => price.close) as number[],
						},
					]}
					options={{
						theme: {
							mode: 'dark',
						},
						chart: {
							height: 500,
							width: 500,
							toolbar: {
								show: false,
							},
							background: 'transparent',
						},
						grid: { show: false },
						stroke: {
							curve: 'smooth',
							width: 4,
						},
						yaxis: { show: false },
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: 'datetime',
							categories: data?.map((price) =>
								new Date(+price.time_close * 1000).toUTCString()
							),
						},
						fill: {
							type: 'gradient',
							gradient: { gradientToColors: ['#0be881'] },
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
