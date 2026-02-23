export async function getWeather(city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=46a7102f3725aeb501718de256451604&lang=pt_br`;

  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Cidade não encontrada");
  }

  return response.json();
}
