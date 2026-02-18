import { mainContent } from "./mainContent.js";
import { weatherData } from "./weatherData.js";

const contentContainer = document.getElementById("main-content");
const searchbar = document.getElementById("searchbar");
const searchButton = document.getElementById("searchButton");
const toggleButton = document.getElementById("toggleButton");

searchButton.addEventListener("click", async () => {
  contentContainer.className = "loading";
  await weatherData.setData(searchbar.value);
  mainContent.displayContent();
  contentContainer.className = "";
  searchbar.value = "";
});

toggleButton.addEventListener("click", async () => {
  contentContainer.className = "loading";
  await weatherData.toggleUnitGroup();
  mainContent.displayContent();
  contentContainer.className = "";
  toggleButton.textContent =
    toggleButton.textContent === "Switch to F°"
      ? "Switch to C°"
      : "Switch to F°";
});
