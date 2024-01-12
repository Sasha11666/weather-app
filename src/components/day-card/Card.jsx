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

  const capitalizeFunc = (string) => {
    let firstLetter = string.slice(0, 1).toUpperCase();
    let rest = string.slice(1);
    let result = firstLetter + rest;
    return result;
  };

  return (
    <div className="card">
      <div>
        {day?.dt_txt.slice(8, 10) +
          " " +
          months[Number(day?.dt_txt?.slice(5, 7)) - 1]}
      </div>

      <img
        src={"http://openweathermap.org/img/w/" + day?.weather[0].icon + ".png"}
        alt="weather image"
      />
      {Number(day?.main.temp) > 0 ? (
        <div className="warm-temp">{day?.main.temp}</div>
      ) : (
        <div className="cold-temp">{day?.main.temp}</div>
      )}

      <div className="wind-speed">
        Скорость ветра м/с : <strong>{day?.wind.speed}</strong>
      </div>
      <div className="humidity">
        Влажность: <strong>{day?.main.humidity}</strong>
      </div>
      <p>{capitalizeFunc(day?.weather[0].description)}</p>
    </div>
  );
};

Card.propTypes = {
  day: PropTypes.object.isRequired,
};
