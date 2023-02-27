import logo from './logo.svg';
import './App.css';
import React from "react";
import PokemonList from "./component/PokemonList";
import PokemonLazyLoad from "./component/PokemonLazyLoad";

function App() {
  return (
    <div>
      <h1>Pokemon List</h1>
      <PokemonList />
      <hr />
      <h1>Pokemon Lazy Load</h1>
      <PokemonLazyLoad />
    </div>
  );
}

export default App;
