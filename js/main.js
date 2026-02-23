import { renderWeather } from "./ui.js";

const inputCity = document.querySelector(".city-name");
const buttonSearch = document.querySelector(".button-search");

buttonSearch.addEventListener("click", () => renderWeather());

inputCity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    renderWeather();
  }
});
