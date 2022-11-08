import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { data2 } from "../API-data/response2";
import { DetailsContext } from "../Context/DetailsContext";
import Movies from "./Movies";

function DetailsMovie() {
  // console.log(useParams());
  const { id } = useParams();

  const { singleMovie, actors, fetchSingleMovie } = useContext(DetailsContext);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const clickLogin = useNavigate();
  const goLogin = () => {
    clickLogin("/login");
  };

  useEffect(() => {
    fetchSingleMovie();
  }, []);

  return (
    <div className="Container-Detail">
      <h3>{singleMovie.fullTitle}</h3>
      <p>Directed by: {singleMovie.directors}</p>

      <p>Top cast:</p>
      {actors.map((actors) => {
        return <p>{actors.actorList}</p>;
      })}

      <div className="">
        <p>
          <img src={singleMovie.image} alt="poster of the movie" />
          Plot summary: {singleMovie.plot}
        </p>
      </div>  
    </div>
  );
}

export default DetailsMovie;
