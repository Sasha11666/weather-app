export async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=841f555cc07065b2ae04b8685f9072ca`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Город не найден");
    } else {
      throw new Error("Ошибка сервера");
    }
  }

  const data = await response.json();
  return data;
}
