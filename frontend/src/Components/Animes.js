// Dependencies
import { useEffect, useState } from "react";


// Components
import Anime from "./Anime";

function Animes() {
  //fetch all animes from the backend and render them as a list using the Anime component. Make sure to style the animes to look like the screenshot from the README. Feel free to use axios to grab data
  const API = process.env.REACT_APP_BASE_URL;
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetch(`${API}/animes`)
      .then(res => res.json())
      .then(res => setAnimeList((prev) => res))
      .catch(err => console.error(err))
  },[])


  return (
    <section className="index" id="anime-list">
      {/* <p>No animes to display</p> */}
      {animeList.map((anime) => {
        return (
          <Anime name={anime.name} description={anime.description}/>
        )
      })}
    </section>
  );
}

export default Animes;
