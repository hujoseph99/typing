import React from "react";
import "./css/App.css";

import AppNavbar from "./components/navbar/AppNavbar";
import Game from "./components/game/Game";
import MainMenu from "./components/menu/MainMenu";
import { Provider } from "react-redux";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainMenu />
        {/* <AppNavbar />
        <Game /> */}
      </div>
    </Provider>
  );
}

export default App;
