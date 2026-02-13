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
    displayTimeOfDay(0);
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
      addShowDayEvent(dayContainer, i);
      calendar.appendChild(dayContainer);
    }
  };

  const displaySelectedDay = (day) => {
    const dayContainer = document.getElementById("selectedDayContainer");
    dayContainer.textContent = "";

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

  const displayTimeOfDay = (day) => {
    const timeOfDayContainer = document.getElementById("timeOfDayContainer");
    timeOfDayContainer.textContent = "";

    const morningContainer = createTimeOfDayContainer(
      "Morning",
      "6am-12pm",
      getTimeOfDayValues(day, 6, 12),
    );
    const noonContainer = createTimeOfDayContainer(
      "Noon",
      "12pm-6pm",
      getTimeOfDayValues(day, 12, 18),
    );
    const eveningContainer = createTimeOfDayContainer(
      "Evening",
      "6pm-10pm",
      getTimeOfDayValues(day, 18, 22),
    );
    const nightContainer =
      day < 14
        ? createTimeOfDayContainer(
            "Night",
            "10pm-6am",
            getTimeOfDayValues(day, 22, 6),
          )
        : document.createElement("div");

    timeOfDayContainer.appendChild(morningContainer);
    timeOfDayContainer.appendChild(noonContainer);
    timeOfDayContainer.appendChild(eveningContainer);
    timeOfDayContainer.appendChild(nightContainer);
  };

  /* --- Helper functions --- */

  // For displayForecastCalendar

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

  // For displaySelectedDay

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

  const createRightSelectedDay = (feelsLikeMin, feelsLikeMax, precipProb) => {
    const container = document.createElement("div");
    const upperHalf = document.createElement("p");
    const lowerHalf = document.createElement("p");

    container.classList.add("rightSelectedDay");
    upperHalf.textContent = `${feelsLikeMax}° / ${feelsLikeMin}°`;
    lowerHalf.textContent = `${precipProb}%`;
    container.appendChild(upperHalf);
    container.appendChild(lowerHalf);

    return container;
  };

  //For displayTimeOfDay

  const createTimeOfDayContainer = (topText, midText, lowerHalfValues) => {
    const container = document.createElement("div");
    const topPart = document.createElement("p");
    const upperMiddlePart = document.createElement("p");
    const lowerMiddlePart = document.createElement("div");
    const temperatureText = document.createElement("p");
    const icon = document.createElement("img");
    const bottomPart = document.createElement("p");

    container.classList.add("timeOfDayContainer");
    temperatureText.textContent = `${lowerHalfValues.max}° / ${lowerHalfValues.min}°`;
    icon.src = images[`${lowerHalfValues.iconName}.svg`];

    topPart.textContent = topText;
    upperMiddlePart.textContent = midText;
    lowerMiddlePart.appendChild(icon);
    lowerMiddlePart.appendChild(temperatureText);
    bottomPart.textContent = `${lowerHalfValues.precripProb}%`;

    container.appendChild(topPart);
    container.appendChild(upperMiddlePart);
    container.appendChild(lowerMiddlePart);
    container.appendChild(bottomPart);

    return container;
  };

  /* Returns the lowest/highest temperature, aswell as the highest precipitation
  probability of an hour span in a day or up to the next day and a matching icon. */
  const getTimeOfDayValues = (day, startHour, endHour) => {
    let temperatures = [];
    let precipProbs = [];
    let iconName;

    if (startHour > endHour) {
      for (let i = startHour; i <= 23; i++) {
        temperatures.push(weatherData.getHours(day)[i].temp);
        precipProbs.push(weatherData.getHours(day)[i].precipprob);
      }
      for (let i = 0; i <= endHour; i++) {
        temperatures.push(weatherData.getHours(day + 1)[i].temp);
        precipProbs.push(weatherData.getHours(day + 1)[i].precipprob);
      }
      iconName = weatherData.getHours(day + 1)[2].icon;
    } else {
      for (let i = startHour; i <= endHour; i++) {
        temperatures.push(weatherData.getHours(day)[i].temp);
        precipProbs.push(weatherData.getHours(day)[i].precipprob);
      }
      iconName = weatherData.getHours(day)[(startHour + endHour) / 2].icon;
    }

    return {
      min: Math.round(Math.min(...temperatures)),
      max: Math.round(Math.max(...temperatures)),
      precripProb: Math.round(Math.max(...precipProbs)),
      iconName: iconName,
    };
  };

  /* --- Event-listener ---- */

  const addShowDayEvent = (container, day) => {
    container.addEventListener("click", () => {
      displaySelectedDay(day);
      displayTimeOfDay(day);
    });
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
