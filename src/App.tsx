import css from './App.module.css';
import { ControlPanel, FanMenu, Sidebar } from '@/ui/compounds';
import { NotifyMe } from './ui/compounds/NotifyMe';

function App() {
	return (
		<main className={css.main}>
			<NotifyMe />
			<ControlPanel />
			<Sidebar />
			<FanMenu />
		</main>
	);
}

export default App;
