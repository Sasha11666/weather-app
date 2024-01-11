import PropTypes from "prop-types";

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
    <div>
      {/* <div>1</div> */}

      <div>
        {day?.dt_txt.slice(8, 10) +
          " " +
          months[Number(day?.dt_txt?.slice(5, 7)) - 1]}
      </div>

      <img
        src={"http://openweathermap.org/img/w/" + day?.weather[0].icon + ".png"}
        alt="weather image"
      />
      <div>{day?.main.temp}</div>
      <p>{capitalizeFunc(day?.weather[0].description)}</p>
    </div>
  );
};

Card.propTypes = {
  day: PropTypes.object.isRequired,
};
