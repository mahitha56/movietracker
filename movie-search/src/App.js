import React, { useState } from "react";

function App() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!movie) return;

    const res = await fetch(
      `https://www.omdbapi.com/?s=${movie}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    );

    const data = await res.json();

    if (data.Response === "True") {
      setMovies(data.Search);
      setError("");
    } else {
      setMovies([]);
      setError("Movie not found ❌");
    }
  };

  const defaultPoster =
    "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎬 Movie Search App</h1>

      <input
        type="text"
        placeholder="Enter movie name..."
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <button
        onClick={searchMovies}
        style={{ padding: "10px 20px", marginLeft: "5px" }}
      >
        Search
      </button>

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {movies.map((m) => (
          <div key={m.imdbID}>
            <h3>{m.Title}</h3>
            <p>Year: {m.Year}</p>

            <img
              src={m.Poster !== "N/A" ? m.Poster : defaultPoster}
              alt={m.Title}
              width="200"
            />
          </div>
        ))}
      </div>

      {error && <h2 style={{ color: "red" }}>{error}</h2>}
    </div>
  );
}

export default App;
