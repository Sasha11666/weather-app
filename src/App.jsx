import { useState } from "react";
import "./App.css";
import { Card } from "./components/day-card/Card";
import search from "./assets/search.svg";
import { getWeather } from "./api/api";

function App() {
  const [weather, setWeather] = useState([{}]);
  const [searchWord, setSearchWord] = useState("");
  const [err, setErr] = useState("");
  const [finalWeather, setFinalWeather] = useState([[]]);

  const setWeatherFunc = (e) => {
    e.preventDefault();
    let weatherCut = [];
    let finalWeatherArr = [];

    getWeather(searchWord)
      .then((weather) => {
        if (Number(weather.list[0].dt_txt.slice(11, 13)) > 12) {
          weatherCut.push(weather.list[0]);
        }
        for (let index = 0; index < weather.list.length; index++) {
          if (
            weather.list[index].dt_txt.slice(11, 13) === "12" ||
            weather.list[index].dt_txt.slice(11, 13) === "00"
          ) {
            weatherCut.push(weather.list[index]);
          }
        }
        console.log(weatherCut);
        for (let index = 0; index < weatherCut.length; index++) {
          for (let j = 0; j < weatherCut.length; j++) {
            if (
              weatherCut[index].dt_txt.slice(8, 10) ===
                weatherCut[j].dt_txt.slice(8, 10) &&
              index !== j &&
              index < j
            ) {
              let arr = [];
              arr.push(weatherCut[index]);
              arr.push(weatherCut[j]);
              finalWeatherArr.push(arr);
            }
          }
        }
        setFinalWeather(finalWeatherArr);
        console.log(finalWeatherArr);
        setSearchWord("");
        setErr("");
      })
      .then(() => {
        setWeather(weatherCut);
      })
      .catch((err) => {
        setErr(err.message);
        setWeather([{}]);
        setFinalWeather([[]]);
      });
  };

  return (
    <>
      <h1>Weather Global</h1>

      <div className="search">
        <form className="searchForm" action="#">
          <label htmlFor="city">Город</label>
          <div>
            <input
              type="search"
              placeholder="Поиск"
              name="city"
              id="city"
              onChange={(event) => setSearchWord(event.target.value)}
            />
            <button onClick={setWeatherFunc}>
              <img className="search-logo" src={search} alt="search logo" />
            </button>
          </div>
        </form>
      </div>
      <div>{err}</div>
      <div className="cards">
        {weather[1]
          ? finalWeather.map((day, index) => <Card day={day} key={index} />)
          : ""}
      </div>
    </>
  );
}

export default App;
