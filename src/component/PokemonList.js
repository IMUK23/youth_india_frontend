import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const pokemonsPerPage = 20;
  const pagesVisited = pageNumber * pokemonsPerPage;

  const displayPokemons = pokemon
    .filter((poke) => {
      if (searchTerm === "") {
        return poke;
      } else if (poke.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return poke;
      }
    })
    .slice(pagesVisited, pagesVisited + pokemonsPerPage)
    .map((poke) => {
      return (
        <div key={poke.id}>
          {/* <img src={poke.sprites.front_default} alt={poke.name} /> */}
          <p>{poke.name}</p>
        </div>
      );
    });

  const pageCount = Math.ceil(pokemon.length / pokemonsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000").then((res) => {
      setPokemon(res.data.results);
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setPageNumber(0);
        }}
      />
      {displayPokemons}
      <ReactPaginate
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        previousClassName={"item previous "}
        nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
        previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 150 }} />}
        
        breakClassName={'item break-me '}
        breakLabel={'...'}
        pageClassName={'item pagination-page '}


        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default PokemonList;
