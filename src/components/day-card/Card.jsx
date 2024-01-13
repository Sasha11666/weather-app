import PropTypes from "prop-types";
import "./card.css";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";

export const Card = ({
  day,
  setDayDetailsOpen,
  setDayDetails,
  setSelectedMonth,
}) => {
  let months = [
    "янв",
    "февр",
    "март",
    "апр",
    "май",
    "июнь",
    "июль",
    "авг",
    "сент",
    "окт",
    "нояб",
    "дек",
  ];

  // const capitalizeFunc = (string) => {
  //   let firstLetter = string.slice(0, 1).toUpperCase();
  //   let rest = string.slice(1);
  //   let result = firstLetter + rest;
  //   return result;
  // };

  return (
    <div
      className="card"
      onClick={() => {
        setDayDetailsOpen(true);
        setDayDetails(day[0]?.dt_txt.slice(8, 10));
        setSelectedMonth(months[Number(day[1]?.dt_txt?.slice(5, 7)) - 1]);
      }}
    >
      <div>
        {day[1]?.dt_txt.slice(8, 10) +
          " " +
          months[Number(day[1]?.dt_txt?.slice(5, 7)) - 1]}
      </div>

      <img
        src={
          "http://openweathermap.org/img/w/" + day[1]?.weather[0].icon + ".png"
        }
        alt="weather image"
      />
      <div className="temp-block">
        <img className="sun-icon" src={sun} alt="" />
        {Number(day[0]?.main.temp) > 0 ? (
          <div className="warm-temp">
            {Math.round(Number(day[0]?.main.temp))} &deg;C
          </div>
        ) : (
          <div className="cold-temp">
            {Math.round(Number(day[0]?.main.temp))} &deg;C
          </div>
        )}
      </div>
      <div className="temp-block">
        <img className="moon-icon" src={moon} alt="" />
        <div className="night-temp">
          {Math.round(Number(day[1]?.main.temp))} &deg;C
        </div>
      </div>

      <div className="wind-speed">
        Скорость ветра м/с : <strong>{day[1]?.wind.speed}</strong>
      </div>
      <div className="humidity">
        Влажность: <strong>{day[1]?.main.humidity}</strong>
      </div>
      {/* <p>{capitalizeFunc(day?.weather[0].description)}</p> */}
    </div>
  );
};

Card.propTypes = {
  day: PropTypes.array.isRequired,
  setDayDetailsOpen: PropTypes.func.isRequired,
  setDayDetails: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
};
