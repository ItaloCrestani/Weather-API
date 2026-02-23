import { getWeather } from "./api.js";
import { formatMonth, formatDay } from "./formatters.js";

const inputCity = document.querySelector(".city-name");
const main = document.querySelector(".main");
const error = document.querySelector(".error");

export async function renderWeather() {
  if (!inputCity.value.trim()) return;

  const city = inputCity.value;

  try {
    const weather = await getWeather(city);

    renderLocal(weather);
    renderDate(weather);
    renderTemp(weather);
    renderElements(weather);
    renderIcon(weather);

    main.classList.remove("hidden");
    error.classList.add("hidden");
  } catch (err) {
    main.classList.add("hidden");
    error.classList.remove("hidden");
  }

  inputCity.value = "";
  inputCity.focus();
}

export function renderLocal(weather) {
  const flag = document.querySelector(".flag");
  const localName = document.querySelector(".local-name");

  flag.setAttribute(
    "src",
    `https://flagsapi.com/${weather.sys.country}/flat/32.png`,
  );

  localName.innerHTML = `${weather.name}, ${weather.sys.country}`;
}

export function renderDate(weather) {
  const localDate = document.querySelector(".local-date");

  const utcTime = weather.dt * 1000;
  const date = new Date(utcTime + weather.timezone * 1000);

  localDate.innerHTML = `${date.getUTCDate().toString().padStart(2, "0")} de ${formatMonth(date)} - 
  ${formatDay(date)} 
  ${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}`;
}

export function renderTemp(weather) {
  const temp = document.querySelector(".temp");
  const description = document.querySelector(".description");
  const feels = document.querySelector(".feels");

  const desc = weather.weather[0].description;

  temp.innerHTML = `${Math.round(weather.main.temp)}°C`;
  description.innerHTML = desc[0].toUpperCase() + desc.slice(1);
  feels.innerHTML = `Sensação de ${Math.round(weather.main.feels_like)}°C`;
}

export function renderElements(weather) {
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  const sunset = document.querySelector(".sunset");

  const windKm = weather.wind.speed * 3.6;
  const sunsetLocal = new Date(
    weather.sys.sunset * 1000 + weather.timezone * 1000,
  );

  humidity.innerHTML = `${weather.main.humidity}%`;
  wind.innerHTML = `${Math.round(windKm)}km/h`;
  sunset.innerHTML = `${sunsetLocal.getUTCHours().toString().padStart(2, "0")}:${sunsetLocal.getUTCMinutes().toString().padStart(2, "0")}`;
}

export function renderIcon(weather) {
  const icon = document.querySelector(".icon");

  const iconId = weather.weather[0].icon;

  icon.setAttribute(
    "src",
    `https://rodrigokamada.github.io/openweathermap/images/${iconId}_t@4x.png`,
  );
}
