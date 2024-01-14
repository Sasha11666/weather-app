import { useState } from "react";
import "./App.css";
import { Card } from "./components/day-card/Card";
import { DetailsCard } from "./components/details-card/DetailsCard";
import search from "./assets/search.svg";
import { getWeather } from "./api/api";

function App() {
  const [weather, setWeather] = useState([{}]);
  const [searchWord, setSearchWord] = useState("");
  const [err, setErr] = useState("");
  const [finalWeather, setFinalWeather] = useState([[]]);
  const [dayDetailsOpen, setDayDetailsOpen] = useState(false);
  const [dayDetails, setDayDetails] = useState("");
  const [fullWeather, setFullWeather] = useState([{}]);
  const [selectedMonth, setSelectedMonth] = useState();

  const setWeatherFunc = (e) => {
    e.preventDefault();
    let weatherCut = [];
    let finalWeatherArr = [];

    getWeather(searchWord)
      .then((weather) => {
        setFullWeather(weather.list);

        if (Number(weather.list[0].dt_txt.slice(11, 13)) > 12) {
          weatherCut.push(weather.list[0]);
        }
        if (Number(weather.list[0].dt_txt.slice(11, 13)) > 21) {
          weatherCut.push(weather.list[0]);
          weatherCut.push(weather.list[0]);
        }

        for (let index = 0; index < weather.list.length; index++) {
          if (
            weather.list[index].dt_txt.slice(11, 13) === "12" ||
            weather.list[index].dt_txt.slice(11, 13) === "21"
          ) {
            weatherCut.push(weather.list[index]);
          }
        }
        if (
          Number(
            weather.list[Number(weather.list.length - 1)].dt_txt.slice(11, 13)
          ) < 12
        ) {
          weatherCut.push(weather.list[Number(weather.list.length - 1)]);
          weatherCut.push(weather.list[Number(weather.list.length - 1)]);
        } else if (
          Number(
            weather.list[Number(weather.list.length - 1)].dt_txt.slice(11, 13)
          ) < 21
        ) {
          weatherCut.push(weather.list[Number(weather.list.length - 1)]);
        }

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
        setDayDetailsOpen(false);
        setFinalWeather(finalWeatherArr);
        setSearchWord("");
        setErr("");
      })
      .then(() => {
        setWeather(weatherCut);
      })
      .catch((err) => {
        setErr(err.message);
        setWeather([{}]);
        setFullWeather([{}]);
        setFinalWeather([[]]);
        setDayDetailsOpen(false);
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
      {!dayDetailsOpen && (
        <div className="cards">
          {weather[1]
            ? finalWeather.map((day, index) => (
                <Card
                  day={day}
                  key={index}
                  setDayDetailsOpen={setDayDetailsOpen}
                  setDayDetails={setDayDetails}
                  setSelectedMonth={setSelectedMonth}
                />
              ))
            : ""}
        </div>
      )}
      {dayDetailsOpen && (
        <div>
          <div className="month">{dayDetails + " " + selectedMonth}</div>
          <div className="hours-cards">
            {fullWeather[1]
              ? fullWeather
                  .filter((val) => {
                    if (val.dt_txt.slice(8, 10) === dayDetails) {
                      return val;
                    }
                  })
                  .map((hour, index) => (
                    <DetailsCard
                      hour={hour}
                      key={index}
                      setDayDetailsOpen={setDayDetailsOpen}
                    />
                  ))
              : ""}
          </div>
          <button
            className="back-button"
            onClick={() => setDayDetailsOpen(false)}
          >
            Вернуться
          </button>
        </div>
      )}
    </>
  );
}

export default App;
