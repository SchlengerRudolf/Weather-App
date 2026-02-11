import { weatherData } from "./weatherData.js";

export const mainContent = (() => {
  const container = document.getElementById("main-content");

  const displayContent = () => {
    container.textContent = "";
    displayHeader();
  };

  const displayHeader = () => {
    const header = document.createElement("h1");
    header.textContent = `Weather ${weatherData.getResolvedAddress()} - 15 Days`;
    header.id = "header";
    container.appendChild(header);
  };

  return { displayContent };
})();
