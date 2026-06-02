import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { settings } from "./defaults/settings";

import GamePage from "./pages/GamePage";
import RecordsPage from "./pages/RecordsPage";
import SettingsPage from "./pages/SettingsPage";
import StartPage from "./pages/StartPage";
import { paths } from "./defaults/constants";

const App = () => {

  useEffect(() => { // put default settings inside localStorage
    Object.entries(settings).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.INDEX} element={<StartPage />} />
        <Route path={paths.GAME} element={<GamePage />} />
        <Route path={paths.RECORDS} element={<RecordsPage />} />
        <Route path={paths.SETTINGS} element={<SettingsPage />} />
        <Route path="*" element={"404, Page not found"} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;