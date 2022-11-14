import React, { useEffect, useState } from "react";
import { data } from "../API-data/response";
import Movie from "../Components/Movie";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/SearchBar";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState("")
  const [nextPage, setNextPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");


  const fetchMovies = async () => {
    try {
      // const url = `https://imdb-api.com/en/API/Top250Movies/${process.env.REACT_APP_KEY}`
      // const response = await fetch();
      // const result = await response.json();
      // setMovies(result.items);
      setMovies(data.items); // use this line if you want to preserve the "fetch" behaviour, but with local data
      console.log("movies from data>>>", data.items);
      // console.log("movies>>>", result.items);
      setPages(data.items)
      console.log("pages length", data.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    setPages();
  }, []);

  const getInput = (input) => {
    console.log("get input>>", input);

    setSearch(input);
    console.log("search >>", search);
  };

  const filterMovies = () => {
    const filteredMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(search.toLowerCase());
    });
    return filteredMovies;
  };

  const handlePageChange = (e, p) => {
    setCurrentPage(p);
  };


  return (
    <div className="Container">
      <SearchBar getInput={getInput} />
      <div className="grid">
        {filterMovies().map((movie) => {
          return <Movie key={movie.id} movie={movie} search={search} />;
        })}
      <Pagination />
      </div>
    </div>
  );
}

export default Movies;
