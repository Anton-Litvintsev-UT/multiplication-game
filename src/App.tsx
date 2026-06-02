import { useEffect } from "react";
import { settings } from "./defaults/settings";

import GamePage from "./Page/GamePage";
import RecordsPage from "./Page/RecordsPage";
import SettingsPage from "./Page/SettingsPage";
import StartPage from "./Page/StartPage";

const App = () => {

  useEffect(() => { // put default settings inside localStorage
    Object.entries(settings).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }, [])

  return (
    <SettingsPage />
  )
};

export default App;