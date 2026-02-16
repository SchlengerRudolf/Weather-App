import { mainContent } from "./mainContent.js";
import { weatherData } from "./weatherData.js";

const searchbar = document.getElementById("searchbar");
const searchButton = document.getElementById("searchButton");
const toggleButton = document.getElementById("toggleButton");

searchButton.addEventListener("click", async () => {
  await weatherData.setData(searchbar.value);
  mainContent.displayContent();
  searchbar.value = "";
});

toggleButton.addEventListener("click", async () => {
  await weatherData.toggleUnitGroup();
  mainContent.displayContent();
  toggleButton.textContent =
    toggleButton.textContent === "Switch to Fahrenheit"
      ? "Switch to Celsius"
      : "Switch to Fahrenheit";
});
