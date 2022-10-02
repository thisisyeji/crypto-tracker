import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouterProps {
	toggleDark: () => void;
	IsDark: boolean;
}

function Router({ toggleDark, IsDark }: IRouterProps) {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/:coinId'>
					<Coin IsDark={IsDark} />
				</Route>
				<Route path='/'>
					<Coins toggleDark={toggleDark} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
export default Router;
