import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";

// for images
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // movieTrailer(movie?.name || "")
      //   .then((url) => {
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     setTrailerUrl(urlParams.get("v"));
      //   })
      //   .catch((error) => console.log(error));
      setTrailerUrl("");
      let trailerUrl = await axios.get(
        `/movie/${movie.id}/videos?api_key=63050f4e4f398990173933eef0e6547d`
      );
      setTrailerUrl(trailerUrl.data.results[0]?.key);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row-poster ${isLargeRow && "row-poster-lg"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.original_title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
