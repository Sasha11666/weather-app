import PropTypes from "prop-types";
import "./card.css";

export const DetailsCard = ({ hour }) => {
  return (
    <div className="card">
      <div>{hour?.dt_txt.slice(11, 16)}</div>
      <img
        src={
          "http://openweathermap.org/img/w/" + hour?.weather[0].icon + ".png"
        }
        alt="weather image"
      />
      <div className="temp-block">
        {Number(hour?.main.temp) > 0 ? (
          <div className="warm-temp">
            {Math.round(Number(hour?.main.temp))} &deg;C
          </div>
        ) : (
          <div className="cold-temp">
            {Math.round(Number(hour?.main.temp))} &deg;C
          </div>
        )}
      </div>

      <div className="wind-speed">
        Скорость ветра м/с : <strong>{hour?.wind.speed}</strong>
      </div>
      <div className="humidity">
        Влажность: <strong>{hour?.main.humidity}</strong>
      </div>
      {/* <p>{capitalizeFunc(day?.weather[0].description)}</p> */}
    </div>
  );
};

DetailsCard.propTypes = {
  hour: PropTypes.object.isRequired,
};
