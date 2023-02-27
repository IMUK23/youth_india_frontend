import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PokemonLazyLoad = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef(null);
  const lastPokemonRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
    setPokemon([]);
    setHasMore(true);
  };

  const getPokemon = () => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`)
      .then((response) => {
        setPokemon((prevPokemon) => [...prevPokemon, ...response.data.results]);
        setHasMore(response.data.results.length > 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPokemon();
  }, [page]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (lastPokemonRef.current) observer.current.observe(lastPokemonRef.current);
  }, [loading, hasMore]);

  const filteredPokemon = pokemon.filter((poke) => {
    if (searchTerm === "") {
      return poke;
    } else if (poke.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return poke;
    }
  });

  const displayPokemon = filteredPokemon.map((poke, index) => {
    if (filteredPokemon.length === index + 1) {
      return (
        <div ref={lastPokemonRef} key={poke.name}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(page - 1) * 20 + index + 1}.png`} alt={poke.name} />
          <p>{poke.name}</p>
        </div>
      );
    } else {
      return (
        <div key={poke.name}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(page - 1) * 20 + index + 1}.png`} alt={poke.name} />
          <p>{poke.name}</p>
        </div>
      );
    }
  });

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleSearchChange} />
      {displayPokemon}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default PokemonLazyLoad;
