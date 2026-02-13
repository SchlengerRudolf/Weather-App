import { weatherData } from "./weatherData.js";
import { format } from "date-fns";

export const mainContent = (() => {
  //Import all weatherIcons
  const images = importAll(
    require.context("../content/weatherIcons", false, /\.svg$/),
  );

  const displayContent = () => {
    displayHeader();
    displayForecastCalendar();
    displaySelectedDay(0);
  };

  /* --- Display function of each individual part of mainContent --- */

  const displayHeader = () => {
    const container = document.getElementById("header");
    const header = document.createElement("h1");

    container.textContent = "";
    header.textContent = `Weather ${weatherData.getResolvedAddress()} - 15 Days`;
    container.appendChild(header);
  };

  const displayForecastCalendar = () => {
    const calendar = document.getElementById("forecastCalendar");
    calendar.textContent = "";

    for (let i = 0; i < 15; i++) {
      const dayContainer = createDayContainer(
        weatherData.getDatetime(i),
        images[`${weatherData.getIcon(i)}.svg`],
        weatherData.getMinTemperature(i),
        weatherData.getMaxTemperature(i),
      );
      calendar.appendChild(dayContainer);
    }
  };

  const displaySelectedDay = (day) => {
    const dayContainer = document.getElementById("selectedDayContainer");

    const leftSide = createLeftSelectedDay(
      weatherData.getDatetime(day),
      images[`${weatherData.getIcon(day)}.svg`],
      weatherData.getMinTemperature(day),
      weatherData.getMaxTemperature(day),
      weatherData.getDescription(day),
    );

    const rightSide = createRightSelectedDay(
      weatherData.getFeelsLikeMin(day),
      weatherData.getFeelsLikeMax(day),
      weatherData.getPrecipitationProbability(day),
    );

    dayContainer.appendChild(leftSide);
    dayContainer.appendChild(rightSide);
  };

  /* --- Helper functions --- */

  const createDayContainer = (date, iconSrc, min, max) => {
    const container = document.createElement("div");
    const upperHalf = document.createElement("p");
    const lowerHalf = document.createElement("div");
    const temperatureText = document.createElement("p");
    const icon = document.createElement("img");

    date = format(date, "EEEEEE dd.MM");
    container.classList.add("dayContainer");
    temperatureText.textContent = `${max}° / ${min}°`;
    icon.src = iconSrc;

    upperHalf.textContent = date;
    lowerHalf.appendChild(icon);
    lowerHalf.appendChild(temperatureText);
    container.appendChild(upperHalf);
    container.appendChild(lowerHalf);

    return container;
  };

  const createLeftSelectedDay = (date, iconSrc, min, max, description) => {
    const container = document.createElement("div");
    const upperPart = document.createElement("p");
    const middlePart = document.createElement("div");
    const lowerPart = document.createElement("p");
    const temperatureText = document.createElement("p");
    const icon = document.createElement("img");

    date = format(date, "EEEEEE dd.MM");
    container.classList.add("leftSelectedDay");
    temperatureText.textContent = `${max}° / ${min}°`;
    icon.src = iconSrc;

    upperPart.textContent = date;
    middlePart.appendChild(icon);
    middlePart.appendChild(temperatureText);
    lowerPart.textContent = description;
    container.appendChild(upperPart);
    container.appendChild(middlePart);
    container.appendChild(lowerPart);

    return container;
  };

  const createRightSelectedDay = (feelsLikeMin, feelsLikeMax, PrecipProb) => {
    const container = document.createElement("div");
    const upperHalf = document.createElement("p");
    const lowerHalf = document.createElement("p");

    container.classList.add("rightSelectedDay")
    upperHalf.textContent = `${feelsLikeMax}° / ${feelsLikeMin}°`;
    lowerHalf.textContent = `${PrecipProb}%`;
    container.appendChild(upperHalf);
    container.appendChild(lowerHalf);

    return container;
  };

  return { displayContent };
})();

// Returns all files inside a folder via require.context() input value

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
