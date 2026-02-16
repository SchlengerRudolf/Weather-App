import { mainContent } from "./mainContent.js";
import { weatherData } from "./weatherData.js";

const searchbar = document.getElementById("searchbar");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", async () => {
  await weatherData.setData(searchbar.value);
  mainContent.displayContent();
  searchbar.value = "";
});
