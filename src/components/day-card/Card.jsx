import PropTypes from "prop-types";
import "./card.css";

export const Card = ({ day }) => {
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
    <div className="card">
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
      {Number(day[1]?.main.temp) > 0 ? (
        <div className="warm-temp">{day[1]?.main.temp} &deg;C</div>
      ) : (
        <div className="cold-temp">{day[1]?.main.temp} &deg;C</div>
      )}
      <div className="night-temp">{day[0]?.main.temp} &deg;C</div>
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
  day: PropTypes.object.isRequired,
};
