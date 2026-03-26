import css from './App.module.css';
import { ControlPanel, FanMenu } from '@/ui/compounds';

function App() {
	return (
		<main className={css.main}>
			<FanMenu />
			<ControlPanel />
		</main>
	);
}

export default App;
