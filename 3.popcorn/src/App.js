import { useEffect, useState } from "react";
import "./App.css";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    
    const APIKEY = "9608a144";
   
    useEffect(function(){

       async function fetchMovies(){
        setLoading(true);
      try{
        const res = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=hulkg454`);
        // console.log(res);
        if(!res.ok) throw new Error("Something went wrong with fetchig movies");

        
        const data=await res.json();
        if(data.Response==='False') throw new Error('movie not found')
        console.log(data);
        
   
        setMovies(data.Search)  
        // console.log(data.Search);
       
      }catch(err){
        //  console.log(err.message);
         setError(err.message)
      }finally{
         setLoading(false)
      }
       
      }
      fetchMovies();
    },[])
  
  return (
    <>
      <NavBar>
        <>
          <Logo />
          <Search />
          <Result movies={movies} />
        </>
      </NavBar>
      <MainBox>
        <>
          {/* <MainBox ele={<MovieUlList movies={movies} />} /> */}
          <MovieBox>

            {/* {loading?<Loader/>:<MovieUlList movies={movies} />} */}
            {loading && <Loader/>}
            {!loading && !error &&<MovieUlList movies={movies}/>}
            {error && <ErrorBx message={error}/>}
          </MovieBox>
          <MovieBox>
            <>
              <WatchSummary watched={watched} />
              <WatchedMoveList watched={watched} />
            </>
          </MovieBox>
          {/* <MovieWatchedList /> */}
        </>
      </MainBox>
    </>
  );
}
function ErrorBx({message}){
  return<p className="error"><span>🛑</span>{message}</p>
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Result({movies}) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function NavBar({children}) {
  return (
    <nav className="nav-bar">
     {children}
    </nav>
  );
}
function Loader(){
  return<p className="loader">Loading.......</p>
}
function MainBox({children}) {
 
  return (
    <main className="main">
      {children}
    </main>
  );
}
function MovieBox({children}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
       children
      )}
    </div>
  );
}
function MovieUlList({movies}){
  // console.log("fff",movies);

  return (
    <ul className="list">
      {movies?.map((movie) => (
        // console.log(movie)
       <MovieSearchList movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function MovieSearchList({ movie }) {
  return (
    <li >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

// function MovieWatchedList(){
//    const [isOpen2, setIsOpen2] = useState(true);

   

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
         
//         </>
//       )}
//     </div>
//   );
// }

function WatchSummary({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>
}
function WatchedMoveList({watched}){
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchList movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function WatchList({movie}){
  return  <li >
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
            <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                  </p>
            </div>
          </li>
}