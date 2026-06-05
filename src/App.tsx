import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { settings } from "./defaults/settings";

import GamePage from "./pages/GamePage";
import RecordsPage from "./pages/RecordsPage";
import SettingsPage from "./pages/SettingsPage";
import StartPage from "./pages/StartPage";
import ResultPage from "./pages/ResultPage";
import { paths, type GameStats } from "./defaults/constants";
import "./i18n";

const App = () => {
	useEffect(() => {
		// put default settings inside localStorage for first session, ignore i18n variable
		if (localStorage.length == 1) {
			// avoid overwriting user preferences on page reload
			Object.entries(settings).forEach(([key, value]) => {
				localStorage.setItem(key, value);
			});
		}
	}, []);

	const [gameStats, setGameScore] = useState<GameStats | undefined>();

	return (
		<BrowserRouter>
			<Routes>
				<Route path={paths.INDEX} element={<StartPage />} />
				<Route
					path={paths.GAME}
					element={
						<GamePage
							setGameStats={(stats: GameStats) => setGameScore(stats)}
						/>
					}
				/>
				<Route path={paths.RECORDS} element={<RecordsPage />} />
				<Route path={paths.SETTINGS} element={<SettingsPage />} />
				<Route
					path={paths.RESULT}
					element={<ResultPage gameStats={gameStats} />}
				/>
				<Route path="*" element={"404, Page not found"} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
