import css from './App.module.css';
import { ControlPanel, FanMenu, Sidebar } from '@/ui/compounds';

function App() {
	return (
		<main className={css.main}>
			<Sidebar />
			<FanMenu />
			<ControlPanel />
		</main>
	);
}

export default App;
